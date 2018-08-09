// import AppDB from "@/vendor/easemob/AppDB.js";
import bus from "@/bus.js";
import http from "@/http.js";
import lstore from "@/plugins/lstore/lstore.js";

const state = {
    status: false,
    // chatRooms: new Map(),
    chatRooms: [],
    messages: new Map(),
    newMessage: false,
};

const actions = {
    initChatRooms({commit, rootState: {CURRENTUSER}}) {
        return new Promise((resolve, reject) => {
            AppDB.init(CURRENTUSER.id)
                .GetChatRooms()
                .then(rooms => {
                    commit("initChatRooms", rooms);
                    resolve(rooms);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    createRoom({commit},room){
        commit("createRoom", room);
    }
};

const mutations = {
    createRoom(state, room) {
        state.chatRooms.push(room);
    },
    updateRoom(state,info){
        // state.chatRooms.get(room.id).lastd;
        for(let key in state.chatRooms){
            if(parseInt(info.id)==parseInt(state.chatRooms[key].id)){
                state.chatRooms[key].latest={data:info.latest};
                state.chatRooms[key].time=info.time;
                break;
            }
        }
    },
    SOCKET_CONNECT: (state, status) => {
        state.status = true;
    },
    SOCKET_USER_MESSAGE: (state, messages) => {
        for(let message of messages){
            if(state.messages.get(message.from)){
                // console.log(state.MESSAGE.messages.get(message.from_user_id));
                state.messages.get(message.from).push(message);
            }else{
                let messageArr = [];
                messageArr.push(message)
                state.messages.set(message.from,messageArr);
            }
        }
        // state.MESSAGE.messages.push(message);
        if(state.messages.get(messages[0].from).length==1){
            bus.$emit("UpdateRoomMessages");
        }

        let ifHave=false;
        for(let key in state.chatRooms){
            if(messages[0].from==parseInt(state.chatRooms[key].id)){
                ifHave=true;
                break;
            }
        }
        if(!ifHave){
            http
                .get(`users/${messages[0].from}`)
                .then((user) => {
                    let room = {
                        avatar:user.data.avatar,
                        id:user.data.id,
                        info:user.data,
                        latest:{data:messages[0].source.data},
                        name:user.data.name,
                        time:Date.parse(new Date()),
                        type:"chat",
                        unreadCount:0,
                        user:lstore.getData('H5_CUR_USER')
                    };
                    state.chatRooms.push(room);
                });
        }else {
            for(let key in state.chatRooms){
                if(messages[0].from==parseInt(state.chatRooms[key].id)){
                    state.chatRooms[key].latest={data:messages[0].source.data};
                    state.chatRooms[key].time=messages[0].time;
                    break;
                }
            }
        }


        state.newMessage = true;
    },
    CLEAR_NEW_MESSAGE: (state) => {
        state.newMessage = false;
    },
    SEND_MESSAGE:(state,message)=>{

        if(state.messages.get(parseInt(message.to))){
            state.messages.get(parseInt(message.to)).push(message);
        }else{
            let messageArr = [];
            messageArr.push(message)
            state.messages.set(parseInt(message.to),messageArr);
        }
    }
};

const getters = {
    hasRoom:({chatRooms})=>id =>{
        for(let room of chatRooms){
            if(parseInt(id)==parseInt(room.id))
                return true;
        }
        return false;
    }
};

export default {state, getters, actions, mutations};
