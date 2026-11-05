<script lang="ts">
	import { authClient, signOut } from '#lib/client/auth/index.ts';
	import { resolve } from '$app/paths';

	const session = authClient.useSession();
</script>

<div
	class="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
>
	{#if $session.data}
		<p class="text-lg font-medium text-gray-900">Merhaba, {$session.data.user.name}</p>
		<button
			onclick={async () => await signOut()}
			class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
		>
			Sign Out
		</button>
	{:else}
		<p class="text-gray-600">Lütfen giriş yapın veya kayıt olun.</p>
		<div class="flex gap-3">
			<a
				href={resolve('/(app)/(auth)/register')}
				class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			>
				Kayıt Ol
			</a>
			<a
				href={resolve('/(app)/(auth)/login')}
				class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
			>
				Giriş Yap
			</a>
		</div>
	{/if}
</div>
