<template>
  <div id="place">
    <div class="title"> {{ placeDetail.name }}</div>
    <div class="description"> {{ placeDetail.description }}</div>
    <div id="viewer" class="viewer-container"></div>
    <div v-for="cart of placeDetail.carts">
      <custom-marker :id="getId(cart.id)">
        <div class="marker-info">{{ cart.title }}</div>
        <div class="marker-info">{{ cart.description }}</div>
      </custom-marker>
    </div>
    <div class="carts">
      <div v-for="cart of placeDetail.carts" class="cart">
        <div>{{ "Title: " + cart.title }}</div>
        <div>{{ "Description: " + cart.description }}</div>
        <div>{{ "Yaw: " + cart.yaw }}</div>
        <div>{{ "Pitch: " + cart.pitch }}</div>
      </div>
    </div>
    <CartModal
        v-if="createCartVisible || updateCartVisible"
        :cartInfo="cartInfo"
        :close="() => closeVisible()"
        :save-or-update="($event) => saveOrUpdate($event)"
    />
  </div>
</template>

<script>
import {Viewer} from '@photo-sphere-viewer/core';
import {MarkersPlugin} from '@photo-sphere-viewer/markers-plugin';
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import CartModal from "./CartModal.vue";
import {PLACE_API} from "@/api/place.js";
import {CART_API} from "@/api/cart.js";

export default {
  name: 'Place',
  components: {
    CartModal
  },
  data() {
    return {
      viewer: null,
      updateCartVisible: false,
      createCartVisible: false,
      cartInfo: {},
      placeDetail: {},
      markers: []
    };
  },
  methods: {
    registerCustomElement() {
      class CustomMarkerElement extends HTMLElement {
        constructor() {
          super();

          this.fmt = new Intl.NumberFormat({maximumSignificantDigits: 4});

          const dom = this.attachShadow({mode: 'closed'});

          const style = document.createElement('style');
          style.innerText = `
:host {
    display: block;
    position: relative;
    width: 50px;
    height: 50px;
}

button {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: none;
    color: white;
    border-radius: 50%;
    filter: drop-shadow(0 10px 5px rgba(0, 0, 0, 0.2));
}

.tooltip {
    box-sizing: border-box;
    width: 300px;
    position: absolute;
    bottom: calc(100% + 10px);
    left: calc(50% -  150px);
    background: rgba(30, 30, 30, 0.8);
    color: white;
    text-shadow: 0 1px #000;
    border-radius: 10px;
    transform-origin: 50% calc(100% + 35px);
    transform: rotate(30deg);
    opacity: 0;
}
.tooltip.bottom {
    bottom: auto;
    top: calc(100% + 10px);
    transform-origin: 50% -35px;
}

.tooltip.hovered {
    animation: rotate-bounce-out 200ms ease forwards;
}

.tooltip slot::slotted(img) {
    width: 100%;
    border-radius: 10px 10px 0 0;
}
.tooltip slot::slotted(h2),
.tooltip slot::slotted(p) {
    margin: 1rem;
    text-align: justify;
}
.tooltip pre {
    font-size: 0.8em;
    margin: 1rem;
}

.tooltip::after {
    content: '';
    width: 0px;
    height: 0px;
    color: rgba(30, 30, 30, 0.8);
    border: 10px solid transparent;
    border-top-color: currentColor;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
}
.tooltip.bottom::after {
    border-top-color: transparent;
    border-bottom-color: currentColor;
    top: auto;
    bottom: 100%;
}

button:hover {
    animation: ripple 1s ease-out;
}

.tooltip.hiding {
    animation: hide 200ms ease forwards;
}

button:hover + .tooltip {
    animation: show 300ms ease forwards;
}

@keyframes ripple {
    0% { box-shadow: 0 0 0 0 rgba(97, 170, 242, 0); }
    20% { box-shadow: 0 0 0 5px rgba(97, 170, 242, 1); }
    100% { box-shadow: 0 0 0 20px rgba(97, 170, 242, 0); }
}
@keyframes show {
    0% { transform: rotate(30deg); opacity: 0; }
    70% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); opacity: 1; }
}
@keyframes hide {
    0% { transform: rotate(0deg); opacity: 1; }
    100% { transform: rotate(30deg); opacity: 0; }
}
`;
          dom.appendChild(style);

          const button = document.createElement('button');
          button.innerHTML = `<svg viewBox="0 0 100 100">
<circle cx=50 cy=50 r=25 fill="currentColor"/>
<circle cx=50 cy=50 r=40 stroke-width=10 fill="none" stroke="currentColor"/>
</svg>`;
          dom.appendChild(button);

          this.tooltip = document.createElement('div');
          this.tooltip.classList.add('tooltip');
          dom.appendChild(this.tooltip);
          this.tooltip.innerHTML = '<slot></slot>';

          this.legend = document.createElement('pre');
          this.tooltip.appendChild(this.legend);

          button.addEventListener('mouseleave', () => {
            this.tooltip.classList.add('hiding');
          });

          button.addEventListener('click', (event) => {
            console.log("click: ", event)
            this.updateCartVisible = true;
            this.cartInfo = event.target;
          });

          dom.addEventListener('animationend', () => {
            this.tooltip.classList.remove('hiding');
          });
        }

        updateMarker({marker, position, viewerPosition, zoomLevel, viewerSize}) {
          this.legend.innerText = `Params
position: ${position.x}px x ${position.y}px
viewerPosition: ${this.fmt.format(viewerPosition.yaw)}rad / ${this.fmt.format(viewerPosition.pitch)}rad
zoomLevel: ${zoomLevel}%
viewerSize: ${viewerSize.width}px x ${viewerSize.height}px
`;
          this.tooltip.classList.toggle('bottom', position.y < viewerSize.height / 3);
        }
      }

      if (!customElements.get('custom-marker')) {
        customElements.define('custom-marker', CustomMarkerElement);
      }
    },
    initializeViewer() {
      console.log("initializeViewer: ", this.placeDetail)
      const markers = this.placeDetail.carts.map(x => {
        return {
          id: x.id,
          element: document.querySelector(`#kim${x.id.split('-')[0]}`),
          listContent: x.title,
          position: {yaw: x.yaw, pitch: x.pitch},
          zIndex: 10,
        }
      })
      const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
      this.viewer = new Viewer({
        container: 'viewer',
        panorama: baseUrl + 'sphere.jpg',
        plugins: [
          [MarkersPlugin, {
            markers
          }],
        ],
      });
      this.viewer.addEventListener('click', (event) => {
        console.log("addEventListener: ", event)
        this.cartInfo = {
          pitch: event.data.pitch,
          yaw: event.data.yaw
        }
        this.createCartVisible = true;
      });
    },
    async saveOrUpdate(payload) {
      if (this.createCartVisible) {
        this.createCartVisible = false;
        payload.placeId = this.$route.params.id
        const result = await CART_API.create(payload)
        if (result.status === 200) {
          location.reload()
        }
      } else {
        this.updateCartVisible = false
        const result = await CART_API.change(this.cartInfo.id, payload)
        if (result.status === 200) {
          location.reload()
        }
      }
    },
    async closeVisible() {
      this.createCartVisible = false;
      this.updateCartVisible = false;
    },
    getId(cartId) {
      return "kim" + cartId.split('-')[0]
    }
  },
  async mounted() {
    await PLACE_API.get(this.$route.params.id).then(res => {
      this.placeDetail = res;
      this.registerCustomElement();
      this.$nextTick(() => {
        this.initializeViewer();
      });
    })
  },
  beforeUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  },
  watch: {}
};
</script>

<style scoped>
#place {
  padding: 20px;

  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .description {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .viewer-container {
    width: 60%;
    height: 300px;
    position: relative;
  }

  .marker-info {
    margin: 10px;
  }

  .carts {
    margin-top: 20px;
    display: flex;
    gap: 20px;

    .cart {
      background-color: #dbdbdb;
      width: fit-content;
      padding: 10px;
      border-radius: 10px;
      box-shadow: -5px 6px 8px 0px rgb(0 0 0 / 26%);

      font-size: 15px;
    }
  }
}
</style>
