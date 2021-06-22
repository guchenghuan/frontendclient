<template>
  <div class="app-container">
    <div class="chart-container documentation-container">
      <chart height="100%" width="100%" />
    </div>
  </div>
</template>

<script>
// import Chart from "@/components/Charts/MixChart";
import Chart from "@/components/Charts/newchart";
export default {
  name: "index",
  components: { Chart },
  data() {
    return {
      input: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
}
.app-container {
  margin-left: 20px;
}
</style>
