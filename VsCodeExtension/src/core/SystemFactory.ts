import {ProgrammingSystem} from "./ProgrammingSystem";
import {NRF52840} from "./NRF52840";
import {NRF52832} from "./NRF52832";

export enum Systems {
    NRF52840,
    NRF52832
}

export function getSystem(systemName: Systems): ProgrammingSystem {
    switch (systemName) {
        case Systems.NRF52840:
            return new NRF52840();
        case Systems.NRF52832:
            return new NRF52832();
    }
}