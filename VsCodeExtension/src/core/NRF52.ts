import {NRF} from "./NRF";
import * as fs from "fs-extra";
import * as path from "path";

export abstract class NRF52 extends NRF {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52 microcontrollers.
         */
        const extra_defines = [
            "NRF52",
        ];
        return super.getDefines().concat(extra_defines);
    }

    public newProjectTask(location: string): boolean {
        if (super.newProjectTask(location)) {
            return this.saveLinkerTemplate(location);
        }
        return false;
    }

    private saveLinkerTemplate(location: string): boolean {
        try {
            fs.writeFileSync(path.join(location, 'ble_app_template_gcc_nrf52.ld'), this.getLinkerTemplate());
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }

    private getLinkerTemplate(): string {
        /*
        Returns Linker configuration for NRF52 devices.
        Linker script configures memory regions.
        */
        return `
            SEARCH_DIR(.)
            GROUP(-lgcc -lc -lnosys)
            
            MEMORY
            {
              FLASH (rx) : ORIGIN = 0x22000, LENGTH = 0xde000
              RAM (rwx) :  ORIGIN = 0x20002128, LENGTH = 0x3ded8
            }
            
            SECTIONS
            {
            }
            
            SECTIONS
            {
              . = ALIGN(4);
              .mem_section_dummy_ram :
              {
              }
            
              . = ALIGN(4);
              .ramfunctions :
              {
                PROVIDE(__start_ramfunctions = .);
                KEEP(*(.ramfunctions))
                PROVIDE(__stop_ramfunctions = .);
              } > RAM
              .log_dynamic_data :
              {
                PROVIDE(__start_log_dynamic_data = .);
                KEEP(*(SORT(.log_dynamic_data*)))
                PROVIDE(__stop_log_dynamic_data = .);
              } > RAM
              .fs_data :
              {
                PROVIDE(__start_fs_data = .);
                KEEP(*(.fs_data))
                PROVIDE(__stop_fs_data = .);
              } > RAM
              .cli_sorted_cmd_ptrs :
              {
                PROVIDE(__start_cli_sorted_cmd_ptrs = .);
                KEEP(*(.cli_sorted_cmd_ptrs))
                PROVIDE(__stop_cli_sorted_cmd_ptrs = .);
              } > RAM
            
            } INSERT AFTER .data;
            
            SECTIONS
            {
              .mem_section_dummy_rom :
              {
              }
              .sdh_soc_observers :
              {
                PROVIDE(__start_sdh_soc_observers = .);
                KEEP(*(SORT(.sdh_soc_observers*)))
                PROVIDE(__stop_sdh_soc_observers = .);
              } > FLASH
              .pwr_mgmt_data :
              {
                PROVIDE(__start_pwr_mgmt_data = .);
                KEEP(*(SORT(.pwr_mgmt_data*)))
                PROVIDE(__stop_pwr_mgmt_data = .);
              } > FLASH
              .sdh_ble_observers :
              {
                PROVIDE(__start_sdh_ble_observers = .);
                KEEP(*(SORT(.sdh_ble_observers*)))
                PROVIDE(__stop_sdh_ble_observers = .);
              } > FLASH
              .log_const_data :
              {
                PROVIDE(__start_log_const_data = .);
                KEEP(*(SORT(.log_const_data*)))
                PROVIDE(__stop_log_const_data = .);
              } > FLASH
              .sdh_req_observers :
              {
                PROVIDE(__start_sdh_req_observers = .);
                KEEP(*(SORT(.sdh_req_observers*)))
                PROVIDE(__stop_sdh_req_observers = .);
              } > FLASH
              .sdh_state_observers :
              {
                PROVIDE(__start_sdh_state_observers = .);
                KEEP(*(SORT(.sdh_state_observers*)))
                PROVIDE(__stop_sdh_state_observers = .);
              } > FLASH
              .sdh_stack_observers :
              {
                PROVIDE(__start_sdh_stack_observers = .);
                KEEP(*(SORT(.sdh_stack_observers*)))
                PROVIDE(__stop_sdh_stack_observers = .);
              } > FLASH
                .cli_command :
              {
                PROVIDE(__start_cli_command = .);
                KEEP(*(.cli_command))
                PROVIDE(__stop_cli_command = .);
              } > FLASH
              
            
            } INSERT AFTER .text
            
            INCLUDE "nrf52_common.ld"`;
    }
}