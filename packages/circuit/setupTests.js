const mobx = require('mobx');

/** Disable the need for actions when mutating observables in tests */
mobx.configure({ enforceActions: 'never' });
