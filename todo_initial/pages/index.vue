<template>
  <main>
    <ol class="categories">
      <li class="category category__work">
        <div>
          <div class="category-title">
            <label>Work</label>
          </div>
        </div>
      </li>
      <li class="category category__private">
        <div>
          <div class="category-title">
            <label>Private</label>
          </div>
        </div>
      </li>
      <li class="category category__random">
        <div>
          <div class="category-title">
            <label>Random</label>
          </div>
        </div>
      </li>
    </ol>
  </main>
</template>

<style lang="scss">
ul,
ol {
  list-style: none;
  padding-left: 0 !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s 0 ease;
}
.todo {
  background-color: white;
  text-align: center;
  border-radius: 4px;
  width: 90%;
  display: flex;
  margin: 6px auto 0;
  padding: 5px 0 3px 5px;
  justify-content: space-between;
  align-items: baseline;
  &__title {
    margin-top: 0;
    max-width: 169px;
    display: flex;
    align-items: center;
    text-align: left;
    &label {
      word-wrap: break-word;
      margin: 0 0.4em;
    }
  }
  &__menu {
    margin-right: 6px;
  }
}
.checkbox {
  display: inline-block;
  margin-top: 0;
  // height: 20px;
}
.categories {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: start;
  margin-top: 30px;
}
.category {
  width: 31%;
  padding: 50px, 10px;
  border-radius: 4px;
  &__work {
    background-color: hsl(182, 31%, 73%);
  }
  &__private {
    background-color: hsl(16, 39%, 77%);
  }
  &__random {
    background-color: hsl(351, 50%, 77%);
  }
}
//以下TodoCategory.vueより
.category-title {
  font-weight: 600;
  & label {
    padding: 15px 20px 0 20px;
    display: block;
    font-size: 20px;
    letter-spacing: 3px;
  }
}

//上部絞り込み部分
.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
  &__checkbox {
    display: flex;
  }
}
.filter {
  padding-top: 0;
  margin-top: 0;
  &:not(:first-of-type) {
    margin-left: 30px;
  }
}
.search__bar {
  display: flex;
  align-self: flex-end;
  &--box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    background-color: #ddd;
    margin-left: 90px;
    & input {
      border: none;
      outline: none;
      box-sizing: border-box;
      background-color: #ddd;
      &::placeholder {
        font-size: 0.5em;
      }
    }
  }
  &--icon {
    height: 13px;
    width: 13px;
    margin: 8px 8px;
  }
}
</style>
