//Needed so tests can use crypto and wont crash
//eslint-disable-next-line no-undef
import { Crypto } from "@peculiar/webcrypto"

global.crypto = new Crypto()