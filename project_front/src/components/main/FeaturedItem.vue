<template>
  <div class="featured-items">
    <Banner @changeOrder="changeOrder" @searchGoods="searchGoods"></Banner>
    <GoodsList></GoodsList>
    <div id="pagination" class="tui-pagination"></div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods.js';
import { createPageNation } from '@/util/tui grid/tuiPagenation';
import Banner from './Banner.vue';
import GoodsList from '../common/GoodsList.vue';
import Validation from '@/util/data/Validation.js';
var pagination;
export default {
  data() {
    return {
      item: {},
      selectedOrder: '',
      searchData: '',
      isSearch: 0,
    };
  },
  async created() {
    let query = this.$route.query;
    if (query.page == undefined) {
      query.page = 1;
    }
    if (query.pageStart == undefined) {
      query.pageStart = (query.page - 1) * 9;
    }
    if (query.perPageNum == undefined) {
      query.perPageNum = 9;
    }
    try {
      const response = await getGoodsList(query);
      this.$store.state.goods.goods = response.data.result;
      this.$store.state.goods.total = response.data.result1[0].TOTAL_COUNT;
      pagination.setTotalItems(this.$store.state.goods.total);
      pagination._paginate(query.page * 1);
    } catch (error) {
      alert(error);
    }
  },
  mounted() {
    pagination = createPageNation('#pagination', 9);

    pagination.on('beforeMove', async function(event) {
      changeGoods(event);
    });
    const changeGoods = event => {
      this.changeGoods(event);
    };
  },
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  components: {
    Banner,
    GoodsList,
  },

  methods: {
    searchGoods(data) {
      this.searchData = data;
      this.isSearch = 1;
      this.changeGoods();
    },
    changeOrder(selectedOrder) {
      this.selectedOrder = selectedOrder;
      this.changeGoods();
    },
    async changeGoods(event) {
      let page = Validation.isNull(event) ? (event.page *= 1) : 1;

      this.$router.push({
        query: {
          fcode: this.$route.query.fcode,
          scode:
            this.searchData.selectCategory != '' &&
            this.searchData.selectCategory != undefined
              ? this.searchData.selectCategory
              : this.$route.query.scode,
          page: page,
          pageStart: (page - 1) * 9,
          perPageNum: 9,
          gdsName:
            this.searchData.goodsName == '' ||
            this.searchData.goodsName == undefined
              ? this.$route.query.gdsName
              : this.searchData.goodsName,
          order:
            this.selectedOrder == ''
              ? this.$route.query.order
              : this.selectedOrder,
          t: new Date().getTime(),
        },
      });
    },
    showGoods(goods) {
      this.showModal = true;
      this.item = goods;
    },
  },
};
</script>
<style scoped>
.goodsTotal {
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
}
a {
  text-decoration: none;
  color: #000000;
  font-size: 15px;
}
a:hover {
  color: #5fb8db;
}
.goodsDiv {
  margin-left: 30px;
}
.card-block {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.card-img-top {
  width: 200px;
  height: 200px;
}
</style>
