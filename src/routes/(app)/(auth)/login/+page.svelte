<script lang="ts">
	import { signInWithEmailAndPassword } from '#lib/client/auth/index.ts';
	import { resolve } from '$app/paths';

	let email = $state('');
	let password = $state('');
	let errorMessage = $state('');
	let isLoading = $state(false);

	async function handleSubmit(event: Event) {
		event.preventDefault();
		errorMessage = '';
		isLoading = true;

		try {
			const { error } = await signInWithEmailAndPassword(email, password);
			if (error) errorMessage = error.message ?? 'An error occurred during login.';
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Giriş Yap</h2>

		{#if errorMessage}
			<p class="mb-4 text-center text-sm text-red-500">{errorMessage}</p>
		{/if}

		<form onsubmit={handleSubmit} class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="email" class="mb-1 text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					class="rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<div class="flex flex-col">
				<label for="password" class="mb-1 text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					class="rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				/>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				class="mt-2 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{isLoading ? 'İşleniyor...' : 'Giriş Yap'}
			</button>
		</form>

		<hr class="my-6 border-gray-200" />

		<div class="flex flex-col gap-2 text-center">
			<a href={resolve('/(app)/(auth)/register')} class="text-sm text-blue-600 hover:underline">
				Hesabınız yok mu? Kayıt olun
			</a>
			<a href={resolve('/(app)')} class="text-sm text-blue-600 hover:underline"> Ana sayfa </a>
		</div>
	</div>
</main>
