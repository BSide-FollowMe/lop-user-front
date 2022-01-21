<template>
  <div class="container" fill-height>
    <div align="center" justify="center" class="container-row">
      <div xs="12" sm="8" md="6" lg="4" xl="3">
        <div class="login-form elevation-12">
          <div class="title-bar">
            <h1>Login</h1>
          </div>
          <div>
            <form @keypress.enter.prevent="onSubmit(userId, password)" @submit.prevent>
              <input id="id" v-model="userId" name="userId" label="Id" type="text"></v-text-field>
              <input id="password" v-model="password" name="password" label="Password" type="password"></v-text-field>
            </form>
          </div>
          <div class="action-btn-area">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Sign In',
  components: {},
  setup() {
    const store = useStore();
    const userId = ref('');
    const password = ref('');
    const onSubmit = (id: string, pwd: string) => {
      store.dispatch('signIn', { id: id, password: pwd });
    };

    return {
      userId,
      password,
      onSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
$primary-color: #1c4758;
$white: #fff;
.container {
  height: 100%;
  &-row {
    height: 100%;
  }
}
.login-form {
  .title-bar {
    padding: 12px 24px;
    background-color: $primary-color;
    color: $white;
    h1 {
      font-size: 20px;
    }
  }
}
.action-btn-area{
  padding: 8px 16px 16px;
}
</style>
