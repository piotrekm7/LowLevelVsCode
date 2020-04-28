import {ProgrammingSystem} from "./ProgrammingSystem";
import {NRF52840} from "./NRF52840";

export enum Systems{
    NRF52840,
}

export function getSystem(systemName: Systems): ProgrammingSystem {
    switch (systemName) {
        case Systems.NRF52840:return new NRF52840();
    }
}