// Asych import function to load the bootstrap module
// This is done to ensure that the required modules are loaded before the application starts,
// allowing webpack to load faker before executing bootstrpa code.
import(`./bootstrap`);
