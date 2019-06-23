<template>
	<div class="v-autocomplete">
		<input 
			class="v-autocomplete-input" 
			type="text" 
			:placeholder="$t('products.search')"
			v-model.trim="searchData" 
      @change="$parent.documentClick()" 
			@input="searchInputChange" 
			@keydown.up="moveUp" 
			@keydown.down="moveDown" 
			@keyup.enter="enterPress"
		/>
	</div>
</template>

<script>
function debounce(func, wait, immediate) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export default {
  name: 'Autocomplete',
  props: {
    getItemFromAjax: {
      type: Function,
      required: false,
    },
    suggStatusComp: {
      type: Object,
      required: false,
    },
    suggItemComp: {
      type: Object,
      required: false,
    },
    suggValue: {
      type: String,
      required: false,
      default: 'value',
    },
    items: {
      type: Array,
      required: false,
    },
    maxSuggestion: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  data() {
    return {
      searchData: '',
      suggestionArray: [],
      currentStatus: 3,
      status: {
        nuetralStatus: 0,
        noDataFound: 1,
        loading: 2,
        closeStatus: 3,
      },
    };
  },
  watch: {
    searchData(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    searchInputChange: debounce(function(e) {
      if (e.target.value !== '') {
        this.currentStatus = this.status.loading;
        this.suggestionArray = [];
        this.getData();
      }
      if (e.target.value === '') {
        this.suggestionArray = [];
        this.currentStatus = this.status.closeStatus;
      }
    }, 500, false),

    async getData() {
      if (this.items) {
        this.suggestionArray = this.items.reduce((accumulative, current) => {
          let currVal = current;
          const objKeys = this.suggValue.split('.');

          for (const objKey of objKeys) {
            currVal = currVal[objKey];
          }

          if (currVal.trim().toLowerCase().includes(this.searchData.toLowerCase())) {
            accumulative.push(current);
          }

          return accumulative;
        }, []);
      } else {
        this.suggestionArray = await this.getItemFromAjax(this.searchData);
      }
    },

    moveDown(e) {
      const selectedSuggElement = document.querySelector('.itemSearch.active');

      if (selectedSuggElement) {
        if (selectedSuggElement.nextSibling) {
          selectedSuggElement.nextSibling.classList.add('active');
          selectedSuggElement.classList.remove('active');
          this.fixScrolling();
        } else {
          selectedSuggElement.classList.remove('active');
        }
      } else {
        const suggElement = document.querySelector('.itemSearch');

        if (suggElement) {
          suggElement.classList.add('active');
        }
      }
    },

    moveUp(e) {
      const selectedSuggElement = document.querySelector('.itemSearch.active');

      if (selectedSuggElement) {
        if (selectedSuggElement.previousSibling) {
          selectedSuggElement.previousSibling.classList.add('active');
          selectedSuggElement.classList.remove('active');
          this.fixScrolling();
        } else {
          selectedSuggElement.classList.remove('active');
        }
      } else {
        const suggElement = document.querySelector('.itemSearch');

        if (suggElement.length > 0) {
          suggElement[suggElement.length - 1].classList.add('active');
        }
      }
    },

    enterPress() {
      const suggElement = document.querySelector('.itemSearch.active');
      if (suggElement) {
        const text  = suggElement.textContent;
        this.$emit('getProducts', text);
      } else {
        this.$emit('getProducts', '');
      }
    },

    fixScrolling() {
      document.querySelector('.suggest-list').scrollTop = document.querySelector('.itemSearch.active').offsetTop - 10;
    },
  },
};
</script>

<style lang="scss" scoped>
  li {
    max-width: 100%;
    list-style: none;
  }
  .v-autocomplete {
    width: 100%;
    position: relative;
    .icon{
      position: absolute;
      right: 5px;
      top: 15px;
      font-size: 16px;
    }
  }
  .v-autocomplete-input {
    width: 100%;
    font-weight: 100%;
    background-color: white;
  }
  .v-suggestion-box {
    width: 100%;
    padding-left: 0px;
    border-style: solid;
    border-width: 0.666667px;
    padding: 1.33333px;
    border-color: white black black black;
    margin: 0 0 0 0;
  }
  .v-suggestion-item.active {
    border: 4px solid black;
  }
</style>
