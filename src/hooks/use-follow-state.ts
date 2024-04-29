import { useMemo } from "react";
import type { Address } from "viem";
import { type FollowState, useConnectedProfile } from "#/api/actions";

/**
 * @description
 * Hook for fetching the follow state between the connected user and a specified address.
 * This hook depends on the `useConnectedProfile` hook to access the current user's profile and
 * perform the follow state lookup. If the user's profile is not loaded or the address is not specified,
 * it defaults to 'none'.
 *
 * @param address - The address whose follow state is to be determined relative to the connected user's profile.
 * @returns {FollowState} - The follow state as a string, which can be 'follows', 'blocks', 'mutes', or 'none'
 * indicating the relationship status from the perspective of the connected user towards the specified address.
 */
export function useFollowState(address: Address): FollowState {
	const { profile } = useConnectedProfile();

	return useMemo(() => {
		return profile ? profile.getFollowState(address) : "none";
	}, [profile, address]);
}
