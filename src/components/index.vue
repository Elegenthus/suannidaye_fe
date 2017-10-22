<template>
  <div :class = "southFlag?'north_out south_in':'south_out north_in'" >
      <div class = "cal">
          <grandpa class = "grand line"></grandpa>
          <app class = "line" v-on:saysomething = "changeword" :direc="southFlag" :gender="gender"></app>
          <div class = "line">
            <div class="flag-controller">
                <div class="flag-switch" data-first-lang="北" data-second-lang="南">
                    <input type="checkbox" id="check1" class="" checked @click="changebg">
                    <label for="check1"></label>
                </div>
                <div class="flag-switch" data-first-lang="男" data-second-lang="女">
                    <input type="checkbox" id="check2" class="" checked @click="changegender">
                    <label for="check2"></label>
                </div>
            </div>
            <blockquote class="bubble">{{word}}</blockquote>
          </div>
          
      </div>  
  </div>
</template>
<script>
import App from './App.vue'
import Grandpa from './grandpa.vue'
export default {
  data(){
      return{
          southFlag:false,
          direc:true,
          gender:true,
          word:"年轻人，有啥想不通的，大爷为你指点迷津"
      }
  },
  components:{
      "app":App,
      "grandpa":Grandpa
  },
  methods:{
      changebg(){
            if(this.southFlag)
                this.southFlag = false;
            else{
                this.southFlag = true;
            }
      },
      changegender(){
          this.gender = !this.gender
      },
      changeword(e){
        if(e == 0)
            this.word = "年轻人，有啥想不通的，大爷为你指点迷津"
        else if(e == 1)
            this.word = "原谅他"
        else if(e == 2)
            this.word = "这还用问，傻孩子"
        else if(e == 3)
            this.word = "咳咳，信息量太大，超出大爷理解范围"
        else if(e == 4)
            this.word = "emmm……年轻人，大爷也迷糊了"
        else if(e == 5)
            this.word = "大爷老了，超过五辈记不住啊"
      }
  }
}
</script>
<style lang="scss">
@import '../scss/switch.scss';
.flag-controller{
    margin-bottom: 140px;
}
.bubble{
    position: relative;
    padding: 30px 25px;
    font-size: 30px;
    width:200px;
    margin-left: 80px;
    color: #000;
    background: #d4dad4;
    border-radius: 10px;
}
.bubble:after{	 
    content: "";
    display: block; /* reduce the damage in FF3.0 */
    position: absolute;
    bottom: -15px;
    left: 50px;
    width: 0;
    border-width: 30px 90px 0px 0px;
    border-style: solid;
    border-color: #d4dad4 transparent;
}

.cal{
    text-align: center;
    padding-top:10%;
    font-size: 0;
}

.grand{
    width: 350px;
}
.line{
    vertical-align: bottom;
    display: inline-block;
}
.south_out{
    background: url('../img/beijing-nanfang.png') no-repeat;
    position: relative;
    background-size: cover;
    background-color: #ffa940;
    height: 100%;
    width: 100%;
    animation: leave 2s ease-in-out;
}

.north_in{
    
    width:100%;
    background: url('../img/beijing-beifang.png') no-repeat;
    background-size: cover;
    background-color: #6f85dd;
    position: relative;
    height: 100%;
    animation: show_now 2s ease-in-out;
}
.north_out{
    width:100%;
    background: url('../img/beijing-beifang.png') no-repeat;
    background-size: cover;
    background-color: #6f85dd;
    position: relative;
    height: 100%;
    animation: leave 2s ease-in-out;
}
.south_in{
    background: url('../img/beijing-nanfang.png') no-repeat;
    position: relative;
    background-size: cover;
    background-color: #ffa940;
    height: 100%;
    width: 100%;
    animation: show_now 2s ease-in-out;
}
@keyframes show_now {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}
@keyframes leave {
    0%{
        opacity: 1;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 0;
    }
}
</style>

