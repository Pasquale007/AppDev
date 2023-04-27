//Needed so tests can use crypto and wont crash
import { Crypto } from "@peculiar/webcrypto"

//eslint-disable-next-line no-undef
global.crypto = new Crypto()