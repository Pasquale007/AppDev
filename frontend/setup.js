//Needed so tests can use crypto and wont crash
import { Crypto } from "@peculiar/webcrypto"

global.crypto = new Crypto()