<template>
  <div>
          <svg viewBox="0 0 200 200" class = "backsvg" v-on:click="changepic">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="svg_l"></use>
        </svg>     
  </div>
</template>
<script>
import {bus} from '../bus.js'
export default {
  data(){
      return{
          svg_l:"#daye",
          controller:0,
          nIntervId:0
      }
  },
  mounted(){
      bus.$on('dynamicGrandpa',this.changepic)
  },
  methods:{
      changepic() {
          this.nIntervId = setInterval(this.changeone, 200);
      },
      changeone(){
          if(this.svg_l == "#daye")
            this.svg_l = "#d_daye"
            else
            this.svg_l = "#daye"
           this.controller++
           if(this.controller > 11){
               clearInterval(this.nIntervId)
               this.controller = 0;
           }
        // console.log("sfdsfs")
      },
  },
}
</script>
<style lang="scss" scoped>
.backsvg{
    
    width: 100%;
}
</style>

