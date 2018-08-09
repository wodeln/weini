export default {
  data() {
    return {
      scrollable: true,
      windowScrollTop: 0,
      isCurrentView: false
    };
  },
  watch: {
    scrollable(val) {
      const el = document.scrollingElement;
      if (val) {
        document.body.style.top = "";
        document.body.classList.remove("m-pop-open");
        el && (el.scrollTop = this.windowScrollTop);
      } else {
        document.body.classList.add("m-pop-open");
        this.windowScrollTop = el ? el.scrollTop : 0;
        document.body.style.top = -this.windowScrollTop + "px";
      }
    }
  },
  methods: {
    goBack(num = -1) {
      window.history.length <= 1
        ? this.$router.push("/")
        : this.$router.back(num);
    }
  }
};
