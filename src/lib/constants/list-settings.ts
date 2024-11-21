export const INITIAL_CHANGED_VALUES = {
  chain: false,
  owner: false,
  manager: false,
  user: false,
  setPrimary: false,
  resetSlot: false
}

export const INITIAL_COMPLETE_TRANSACTIONS = {
  ...INITIAL_CHANGED_VALUES,
  claimSlot: false
}
