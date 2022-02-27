<template>
  <div class="text-center">
    <h1>식물의 언어 임시 라우팅 페이지</h1>
    <router-link to="/home">메인페이지</router-link>
    <br />
    <router-link to="/signin">로그인/회원가입</router-link>
    <br />
    <router-link to="/search?q=콩난">검색결과</router-link>
    <br />
    <router-link to="/modal-test">모달테스트 페이지</router-link>
    <br />
    <router-link to="/qna">질문 답변 게시판</router-link>
    <br/>
    <router-link to="/qna/edit">질문 답변 글쓰기</router-link>
    <br/>
    <router-link to="/plant/1">식물상세</router-link>
    <br />
    <router-link to="/me">마이페이지</router-link>
    <br />
    <router-link to="/me/my-plant">내가저장한식물</router-link>
    <br />
    <router-link to="/me/setting">마이페이지-세팅</router-link>
    <br />
    <router-link to="/guide/water">가이드 물주기</router-link>
    <br />
    <router-link to="/guide/ventilation">가이드 통풍</router-link>
    <br />
    <router-link to="/guide/sunlight">가이드 양지/음지</router-link>
    <br />
    <router-link to="/guide/blight">가이드 아플 때</router-link>
    <br />
    <router-link to="/logout">로그아웃</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Landing',
  setup() {
    return {};
  },
});
</script>
