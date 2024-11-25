<template>
  <div id="sidebar">
    <div v-for="(item, index) in menu" :key="index">
      <div v-if="item.children">
        <div
          class="label"
          style="display: flex; align-items: center"
          @click="item.show = !item.show"
        >
          <span v-if="!item.show" class="material-icons label-icon"
            >expand_less</span
          >
          <span v-else class="material-icons label-icon">{{ item.icon }}</span>
          <span class="label-name">{{ item.name }}</span>
        </div>
        <div v-for="child in item.children" v-if="item.show" :key="index">
          <div
            :class="selectedMenu === child.selectedMenu ? 'selected' : ''"
            class="list-label"
            @click="changePage(child.path)"
          >
            <span class="material-icons label-icon">{{ child.icon }}</span>
            <span class="label-name">
              <span>{{ child.name }}</span>
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          :class="selectedMenu === item.selectedMenu ? 'selected' : ''"
          class="label"
          @click="changePage(item.path)"
        >
          <span class="material-icons label-icon">{{ item.icon }}</span>
          <span class="label-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { Menu } from "./Menu.js";

export default {
  name: "Sidebar",
  components: {},
  props: {},
  data() {
    return {
      selectedMenu: this.$route.name,
      menu: Menu,
    };
  },
  computed: {
    ...mapGetters({}),
    ...mapState({}),
  },
  methods: {
    changePage(type) {
      this.$router.push(`/${type}`);
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
#sidebar {
  background-color: #01586f;
  min-width: 250px;
  padding: 20px 0 20px 10px;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;

  .selected {
    background-color: white;
    border-radius: 50px;
    cursor: pointer;

    .label-name {
      color: var(--brand-color);
    }

    .label-icon {
      color: var(--brand-color);
    }
  }

  .list-label {
    padding: 3px 15px;
    color: white;
    display: flex;
    align-items: center;
    width: 115%;
    margin-left: 15px;

    .label-icon {
      font-size: 18px;
      margin-left: 5px;
    }

    &:hover {
      background-color: white;
      border-radius: 50px;
      cursor: pointer;

      .verify-count {
        background-color: var(--brand-color);
        color: white;
      }

      .label-name {
        color: var(--brand-color);
      }

      .label-icon {
        color: var(--brand-color);
      }
    }

    .label-name {
      margin-left: 5px;
      font-family: var(--text-style);
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 199.5%;
    }
  }

  .label {
    padding: 5px 15px;
    display: flex;
    align-items: center;
    width: 115%;
    color: white;

    &:hover {
      background-color: white;
      border-radius: 50px;
      cursor: pointer;

      .label-name {
        color: var(--brand-color);
      }

      .label-icon {
        color: var(--brand-color);
      }
    }

    .label-name {
      margin-left: 15px;
      font-family: var(--text-style);
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 199.5%;
    }
  }
}
</style>
