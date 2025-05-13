<template>
  <div class="card w-full max-w-sm shadow-xl bg-base-100">
    <div class="card-body">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="form-control mb-4">
          <InputLabel for="email" title="Email" required />
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control mb-6">
          <InputLabel for="password" title="Password" required />
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="input input-bordered"
            required
          />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover"
              >Forgot password?</a
            >
          </label>
        </div>
        <div class="form-control">
          <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>
      </form>
      <p class="text-center text-sm mt-4">
        Don't have an account?
        <a href="#" class="link link-primary">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "plain",
});

const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
};
</script>
