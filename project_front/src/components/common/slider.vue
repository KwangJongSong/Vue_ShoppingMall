<template>
  <div class="container">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item active">
          <router-link to="" @click.native="replaceUrl()">
            <img :src="require('@/assets/images/all.png')" />
            <div class="carousel-caption">
              <h3>전체</h3>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link @click.native="replaceUrl(100)" to="">
            <img :src="require('@/assets/images/doll.jpg')" />
            <div class="carousel-caption">
              <h3>인형/토이</h3>
              <p>
                작은 인형부터 큰 인형, 장난감 상품을 볼 수 있습니다.
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link to="" @click.native="replaceUrl(200)">
            <img :src="require('@/assets/images/moongu.jpg')" />

            <div class="carousel-caption">
              <h3>문구</h3>
              <p>
                생활에 필요한 문구상품을 볼 수 있습니다.
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link @click.native="replaceUrl(300)" to="">
            <img :src="require('@/assets/images/com.jpeg')" />
            <div class="carousel-caption">
              <h3>컴퓨터/모바일</h3>
              <p>
                컴퓨터 및 모바일 용품을 볼 수 있습니다.
              </p>
            </div>
          </router-link>
        </div>

        <div class="item">
          <router-link to="" @click.native="replaceUrl(400)">
            <img :src="require('@/assets/images/jubang.jpg')" />
            <div class="carousel-caption">
              <h3>주방용품</h3>
              <p>
                가정 주방 용품을 볼 수 있습니다.
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->
      </div>
      <!-- End Carousel Inner -->

      <ul class="nav nav-pills nav-justified">
        <li
          data-target="#myCarousel"
          data-slide-to="0"
          class="active"
          id="first"
        >
          <a href="#"> 전체 상품<small>쇼핑몰의 전체 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="1">
          <a href="#"> 인형/토이<small>인형/토이 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="2">
          <a href="#"> 문구<small>문구 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="3">
          <a href="#">
            컴퓨터/모바일<small>컴퓨터/모바일 상품을 봅니다.</small>
          </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="4">
          <a href="#"> 주방용품<small>주방용품 상품을 봅니다.</small> </a>
        </li>
      </ul>
    </div>
    <!-- End Carousel -->
  </div>
</template>

<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
import Validation from '@/util/data/Validation.js';
import 'hooper/dist/hooper.css';

export default {
  mounted() {
    $(document).ready(function() {
      $('#myCarousel').carousel({
        interval: 3000,
      });

      var clickEvent = false;
      $('#myCarousel')
        .on('click', '.nav a', function() {
          clickEvent = true;
          $('.nav li').removeClass('active');
          $(this)
            .parent()
            .addClass('active');
        })
        .on('slid.bs.carousel', function(e) {
          if (!clickEvent) {
            var count = 4; //메뉴 개수
            var current = $('.nav li.active');
            current
              .removeClass('active')
              .next()
              .addClass('active');
            var id = parseInt(current.data('slide-to'));
            if (4 == id) {
              $('#first').addClass('active');
            }
          }
          clickEvent = false;
        });
    });
  },
  methods: {
    replaceUrl(fcode, scode) {
      this.$router.replace({
        path: '/shop/list/category',
        query: {
          fcode: !Validation.isNull(fcode) ? '' : fcode,
          scode: !Validation.isNull(scode) ? '' : scode,
          page: 1,
          pageStart: 0,
          perPageNum: 9,
          t: new Date().getTime(),
        },
      });
      this.preUrl = this.$route.path;
    },
  },
};
</script>

<style scoped>
body {
  padding-top: 20px;
}
#myCarousel img {
  width: 100%;
  height: 400px;
}
#myCarousel .nav a small {
  display: block;
}
#myCarousel .nav {
  background: #eee;
}
#myCarousel .nav a {
  border-radius: 0px;
}
.carousel-caption h3,
.carousel-caption p {
  color: black;
}
a {
  color: black;
}
</style>
