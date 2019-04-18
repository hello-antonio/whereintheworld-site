<template>
  <div class="app-filter">
    <div id="filterLabel" class="visuallyhidden">Select a region</div>
    <app-button
      class="button--primary"
      id="selectButton"
      ref="selectButton"
      aria-haspopup="listbox"
      aria-labelledby="selectButton"
      :event="handleButtonClick"
    >
      <template>
        <span>Filter by Region</span>
        <app-icon iconName="icon-chevron-down"></app-icon>
      </template>
    </app-button>
    <!-- Regions select dropdown -->
    <ul
      class="app-dropdown theme-light"
      ref="dropdown"
      tabindex="-1"
      role="listbox"
      aria-labelledby="filterLabel"
      @blur.capture="handleDropdownBlur"
      @keydown="handleDropdownKeydown"
      hidden
    >
      <li
        class="button button--basic"
        v-for="(name, index) in dropdownOptions"
        role="option"
        :id="`id${index}`"
        :key="`id${index}`"
        @mousedown.capture="handleDropdownItemClick"
      >
        {{ name }} ({{ $store.state.regionTotals[name] }})
      </li>
    </ul>
  </div>
</template>

<script>
import AppButtonVue from './AppButton.vue'
import AppIconVue from './AppIcon.vue'
export default {
  name: 'select-box',
  components: {
    'app-button': AppButtonVue,
    'app-icon': AppIconVue
  },
  data() {
    return {
      selectionPosition: 0,
      selection: null,
      activeSelection: null,
      keyboardCodes: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        enter: 'Enter',
        end: 'End',
        home: 'Home',
        esc: 'Escape'
      },
      dropdownElements: null
    }
  },
  methods: {
    handleButtonClick() {
      this.showDropdown()
    },
    handleDropdownBlur() {
      // store selection just in case
      this.setSelection(this.activeSelection.textContent.trim())
      this.hide()
    },
    handleDropdownItemClick({ target }) {
      this.selectElement(target)
      this.setSelection(this.activeSelection.textContent.trim())
      this.hide()
    },
    handleDropdownKeydown(event) {
      // a11y keyboard user
      const { code, key } = event
      let keyCode = code || key
      if (event.isComposing || event.keyCode === 229) return

      if (Object.values(this.keyboardCodes).includes(keyCode)) {
        event.preventDefault()
        this.selectWithKeyboard(keyCode)
      }
      return
    },
    showDropdown() {
      this.show()
    },
    hidden() {
      if (this.$refs.dropdown.hasAttribute('hidden')) return true
      else return false
    },
    show() {
      if (!this.hidden()) return
      this.$refs.selectButton.$el.setAttribute('aria-expanded', true)
      this.$refs.dropdown.removeAttribute('hidden')
      this.$refs.dropdown.focus()
    },
    hide() {
      if (this.hidden()) return
      this.$refs.selectButton.$el.removeAttribute('aria-expanded')
      this.$refs.selectButton.$el.focus()
      this.$refs.dropdown.setAttribute('hidden', true)
    },
    selectElement(element) {
      this.activeSelection = element
      if (this.selection !== this.activeSelection) {
        if (this.selection !== null) {
          this.selection.classList.remove('selected')
          this.selection.removeAttribute('aria-selected')
        }
        this.activeSelection.classList.add('selected')
        this.activeSelection.setAttribute('aria-selected', true)
        this.selection = this.activeSelection
      }
      // a11y alert user selection
      this.$refs.dropdown.setAttribute(
        'aria-activedescendant',
        this.activeSelection.id
      )
    },
    setSelection(newSelection) {
      // stores the selection text/value on a $store.state to use it to filter the data
      this.$store.dispatch('setSelection', newSelection.trim().split(' ')[0])
      // get the value via $store.state or $store.getters
    },
    checkPosition(position) {
      if (this.dropdownElements[position] !== undefined) return true
      else false
    },
    selectWithKeyboard(key) {
      const { up, down, esc, enter, home, end } = this.keyboardCodes
      switch (key) {
        case down:
          if (this.checkPosition(++this.selectionPosition))
            this.selectionPosition
          else this.selectionPosition = this.dropdownElements.length - 1
          break
        case up:
          if (this.checkPosition(--this.selectionPosition))
            this.selectionPosition
          else this.selectionPosition = 0
          break
        case home:
          this.selectionPosition = 0
          break
        case end:
          this.selectionPosition = this.dropdownElements.length - 1
          break
        case enter:
        case esc:
          this.setSelection(this.activeSelection.textContent.trim())
          this.hide()
          break
      }
      this.selectElement(this.dropdownElements[this.selectionPosition])
      return
    },
    initDropdownSelection() {
      this.dropdownElements = [
        ...this.$refs.dropdown.querySelectorAll('[role=option]')
      ]
      this.selectElement(
        this.dropdownElements.find(a =>
          a.textContent.includes(this.$store.state.selection)
        )
      )
    }
  },
  updated() {
    this.initDropdownSelection()
  },
  computed: {
    dropdownOptions() {
      return this.$store.state.regions
    }
  }
}
</script>

<style scoped>
.app-filter {
  max-width: 200px;
}
.app-filter .button {
  position: relative;
}
.app-filter > * {
  width: 200px;
}
.app-dropdown {
  position: absolute;
  z-index: 1222;
  min-height: auto;
  margin: 0;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 0.875em rgba(0, 0, 0, 0.16);
}

.app-dropdown .button:not(:last-child) {
  margin: 0 0 0.5rem;
}
</style>
