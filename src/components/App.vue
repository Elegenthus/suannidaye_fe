<template>
  <div class="calculator">
    <div class="content">
      <div class="monitor">
        <div class="relations">{{str}}</div>
        <div class="relations result">{{result}}</div>
      </div>
      <div class="button-box">
        <button @click="clear" class="button-share button right">AC</button>
        <button @click="back" class="button-share button right">
          <svg viewBox="0 0 200 200" class = "backsvg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
          </svg>
          </button>       
        <button class="button-share button normal" v-for="(item,index) in relations" @click="add(index)">{{item}}</button>
        <button class="button-share longbtn me" v-on:click = "callme">叫我啥</button><button class="button-share longbtn you" v-on:click = "submit">找大爷</button>
      </div>
    </div>
  </div>
</template>
<script>
import "whatwg-fetch";
import { bus } from "../bus.js";
export default {
  data() {
    return {
      str: "",
      relations: ["父", "母", "兄", "姐", "弟", "妹", "儿", "女", "夫", "妻"],
      oral: ["爸爸", "妈妈", "哥哥", "姐姐", "弟弟", "妹妹", "儿子", "女儿", "老公", "老婆"],
      arr: [],
      result: "看你大爷",
      me: "",
      status: 0
    };
  },
  mounted() {
    console.log(this.gender, this.direc);
  },
  props: ["gender", "direc"],
  methods: {
    add(index) {
      if (this.arr.length < 5) {
        if (this.str) {
          this.str += "的";
        }
        this.str += this.oral[index];
        this.arr.push(index);
      } else {
        this.$emit("saysomething", 5);
      }
    },
    clear() {
      this.str = "";
      this.arr = [];
      this.result = "";
    },
    back() {
      this.str = this.str.slice(0, -3);
      this.arr.pop();
      console.log(this.arr);
    },
    callme() {
      fetch("/suan/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          direction: this.direc ? 0 : 1,
          sex: this.gender ? 0 : 1,
          relation: this.arr.join("")
        })
      })
        .then(res => {
          return res.json();
        })
        .then(value => {
          if (Array.isArray(value.me)) this.result = value.me.join("");
          else this.result = value.me;
          this.status = value.status;
          bus.$emit("dynamicGrandpa");
          this.$emit("saysomething", this.status);
        });
    },
    submit() {
      fetch("/suan/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          direction: this.direc ? 1 : 0,
          sex: this.gender ? 1 : 0,
          relation: this.arr.join("")
        })
      })
        .then(res => {
          return res.json();
        })
        .then(value => {
          // if( this.status == 2 || this.status == 0){
          //   console.log("hshsh",this.status,this.result)
          //   this.result = value.result[0]
          // }
          // else{
          //   console.log("xiixixi",this.status,this.result)
          //   this.result = value.result
          // }
          if (Array.isArray(value.result)) this.result = value.result.join("");
          else this.result = value.result;
          this.status = value.status;
          bus.$emit("dynamicGrandpa");
          this.$emit("saysomething", this.status);
        });
    }
  }
};
</script>


<style lang="scss">
.calculator {
  width: 370px;
  height: 460px;
  background-color: #d4dad4;
  padding-top: 40px;
  box-sizing: border-box;
  border-radius: 16px;
}
.content {
  margin: 0 auto;
  width: 320px;
  height: 400px;
}
.monitor {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 20px 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px 1px #773e2c inset;
  background-color: white;
}
.relations {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: right;
  font-size: 18px;
}
.result {
  font-size: 30px;
}
.button-box {
  width: 320px;
  height: 300px;
}

.button-share {
  box-shadow: 0px 0px 10px 1px #773e2c;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  color: white;
  font-size: 30px;
  margin: 5px;
}
.button {
  width: 70px;
  height: 56px;
}
.normal {
  background-color: #5c7886;
}
.right {
  background-color: #d7ab7c;
}
.right {
  float: right;
}
.longbtn {
  width: 150px;
  margin: 5px;
  background-color: #7c8a4f;
}
.me {
  background-color: #7c8a4f;
}
.you {
  background-color: #e0a497;
}
.backsvg {
  fill: white;
}
</style>
