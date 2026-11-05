import { goto, refreshAll } from '$app/navigation';
import { resolve } from '$app/paths';
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient();

export const signUpWithEmailAndPassword = async (
	name: string,
	email: string,
	password: string,
	callbackURL: string = '/'
) => {
	const { data, error } = await authClient.signUp.email(
		{
			name,
			email,
			password,
			callbackURL
		},
		{
			onSuccess: async () => {
				await refreshAll();
				// @ts-expect-error: SvelteKit dinamik string değişkenleri doğrudan kabul etmez
				await goto(resolve(callbackURL));
			},
			onError: (ctx) => {
				console.error('Sign-up error:', ctx.error.message);
			}
		}
	);

	return { data, error };
};

export const signInWithEmailAndPassword = async (
	email: string,
	password: string,
	rememberMe: boolean = true,
	callbackURL: string = '/'
) => {
	const { data, error } = await authClient.signIn.email(
		{
			email,
			password,
			rememberMe,
			callbackURL
		},
		{
			onSuccess: async () => {
				await refreshAll();
				// @ts-expect-error: SvelteKit dinamik string değişkenleri doğrudan kabul etmez
				await goto(resolve(callbackURL));
			},
			onError: (ctx) => {
				if (ctx.error.status === 403) {
					console.error('Please verify your email address');
				} else {
					console.error('Sign-in error:', ctx.error.message);
				}
			}
		}
	);

	return { data, error };
};

export const signOut = async (redirectTo: string = '/login') => {
	const { data, error } = await authClient.signOut({
		fetchOptions: {
			onSuccess: async () => {
				await refreshAll();
				// @ts-expect-error: SvelteKit dinamik string değişkenleri doğrudan kabul etmez
				await goto(resolve(redirectTo));
			}
		}
	});

	return { data, error };
};
