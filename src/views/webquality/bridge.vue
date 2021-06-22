<template>
  <div class="app-container">
    <div class="chart-container documentation-container">
      <chart height="100%" width="100%" />
    </div>
  </div>
</template>

<script>
// import Chart from "@/components/Charts/MixChart";
import Chart from "@/components/Charts/webquaily"; // MixChart  LineMarker
export default {
  name: "bridge",
  components: { Chart },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    search() {
      alert("功能还在实现中");
    },
    doIt() {
      console.log("45444655");
    },
  },
};
</script>

<style lang="scss" scoped>
.URL-input {
  position: relative;
  width: 60%;
}

.chart-container {
  position: relative;
  width: 100%;
}
.app-container {
  margin-left: 20px;
}
</style>
