import type { Address, Hex } from "viem";
import type { ENSProfile } from "#/lib/types";
import { formatAddressOrName } from "#/lib/utilities";

export interface FollowerResponse {
	address: Address;
	ens: ENSProfile;
	tags: Array<string>;
	is_muted: boolean;
	is_blocked: boolean;
	is_following: boolean;
}

export interface FollowingResponse {
	address: Address;
	version: 1;
	record_type: "address" & string;
	data: Address & Hex;
	tags: Array<string>;
	ens?: ENSProfile;
}

export interface StatsResponse {
	followers_count: number;
	following_count: number;
}

export interface ProfileResponse {
	address: Address;
	ens: ENSProfile;
	fresh: number;
	resolver: string;
	primary_list: string;
	stats: StatsResponse | undefined;
	followers: Array<FollowerResponse>;
	following: Array<FollowingResponse>;
	chains: Record<string, string>;
	errors: Record<string, unknown>;
}

type AddressOrName = Address | string;

///////////////////////////////////////////////////////////////////////////////
// /users/:addressOrENS/profile
///////////////////////////////////////////////////////////////////////////////

export async function fetchUserFollowers(
	addressOrName?: AddressOrName,
): Promise<{ followers: Array<FollowerResponse> }> {
	if (!addressOrName)
		return {
			followers: [],
		};

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
			addressOrName,
		)}/followers?include=ens`,
		{
			cache: "default",
			// cache: "no-cache",
		},
	);
	const data = (await response.json()) as {
		followers: Array<FollowerResponse>;
	};
	// console.log('fetchFollowers', data)
	return data;
}

export async function fetchUserFollowing(
	addressOrName?: AddressOrName,
): Promise<{ following: Array<FollowingResponse> }> {
	if (!addressOrName)
		return {
			following: [],
		};

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
			addressOrName,
		)}/following?include=ens`,
		{
			cache: "default",
			// cache: "no-cache",
		},
	);

	const data = (await response.json()) as {
		following: Array<Omit<FollowingResponse, "address">>;
	};
	// add address field
	const modifiedData = data.following.map((following) => ({
		...following,
		address: following.data,
	}));

	return { following: modifiedData };
}

export async function fetchUserProfile({
	addressOrName,
}: { addressOrName: AddressOrName }): Promise<ProfileResponse> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
			addressOrName,
		)}/profile`,
		{
			cache: "default",
			// cache: "no-cache",
		},
	);

	const data = (await response.json()) as ProfileResponse;
	return data;
}

export async function fetchUserStats(
	addressOrName?: AddressOrName,
): Promise<{ stats: StatsResponse }> {
	if (!addressOrName)
		return {
			stats: { followers_count: 0, following_count: 0 },
		};

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_EFP_API_URL}/users/${formatAddressOrName(
			addressOrName,
		)}/profile?include=stats`,
		{
			cache: "default",
			// cache: "no-cache",
		},
	);

	const data = (await response.json()) as { stats: StatsResponse };
	// console.log('fetchFollowing', data)
	return data;
}
