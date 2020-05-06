import {NRF52} from "./NRF52";

export class NRF52840 extends NRF52 {
    protected getDefines(): Array<string> {
        /*
        Adds defines specific for NRF52840 microcontrollers.
         */
        const extra_defines = [
            'BOARD_PCA10056',
        ];
        return super.getDefines().concat(extra_defines);
    }

    protected getDeviceSignature(): string {
        return "NRF52840_XXAA";
    }

    // TODO Add some docs
    // TODO Move some flags to higher level class
    // TODO extract common flags to another function
    protected getCFlags(): string {
        const flags = [
            '-DBOARD_PCA10056',
            '-DCONFIG_GPIO_AS_PINRESET',
            '-DFLOAT_ABI_HARD',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140',
            '-DSOFTDEVICE_PRESENT',
            '-DSWI_DISABLE0',
            '-mcpu=cortex-m4',
            '-mthumb -mabi=aapcs',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-ffunction-sections -fdata-sections -fno-strict-aliasing',
            '-fno-builtin -fshort-enums',
            '-D__HEAP_SIZE=8192',
            '-D__STACK_SIZE=8192'
        ];
        return super.getCFlags() + flags.join(' ');
    }

    protected getAsmFlags(): string {
        const flags = [
            '-mcpu=cortex-m4',
            '-mthumb -mabi=aapcs',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-DBOARD_PCA10056',
            '-DCONFIG_GPIO_AS_PINRESET',
            '-DFLOAT_ABI_HARD',
            '-DNRF52840_XXAA',
            '-DNRF_SD_BLE_API_VERSION=5',
            '-DS140',
            '-DSOFTDEVICE_PRESENT',
            '-DSWI_DISABLE0',
            '-D__HEAP_SIZE=8192',
            '-D__STACK_SIZE=8192'
        ];
        return super.getAsmFlags() + flags.join(' ');
    }

    protected getLdFlags(): string {
        const flags = [
            '-mthumb -mabi=aapcs -L $(SDK_ROOT)\\modules\\nrfx\\mdk -T $(LINKER_SCRIPT)',
            '-mcpu=cortex-m4',
            '-mfloat-abi=hard -mfpu=fpv4-sp-d16',
            '-Wl,--no-gc-sections',
            '-Wl,--verbose',
            '--specs nosys.specs',
            '--specs nano.specs',
        ];
        return flags.join(' ');
    }


    //TODO generate it automatically
    protected getIncludeFolders(): string {
        return(
`         $(SDK_ROOT)/components/nfc/ndef/generic/message \\
          $(SDK_ROOT)/components/nfc/t2t_lib \\
          $(SDK_ROOT)/components/nfc/t4t_parser/hl_detection_procedure \\
          $(SDK_ROOT)/components/ble/ble_services/ble_ancs_c \\
          $(SDK_ROOT)/components/ble/ble_services/ble_ias_c \\
          $(SDK_ROOT)/components/libraries/pwm \\
          $(SDK_ROOT)/components/libraries/usbd/class/cdc/acm \\
          $(SDK_ROOT)/components/libraries/usbd/class/hid/generic \\
          $(SDK_ROOT)/components/libraries/usbd/class/msc \\
          $(SDK_ROOT)/components/libraries/usbd/class/hid \\
          $(SDK_ROOT)/modules/nrfx/hal \\
          $(SDK_ROOT)/components/nfc/ndef/conn_hand_parser/le_oob_rec_parser \\
          $(SDK_ROOT)/components/libraries/log \\
          $(SDK_ROOT)/components/ble/ble_services/ble_gls \\
          $(SDK_ROOT)/components/libraries/fstorage \\
          $(SDK_ROOT)/components/nfc/ndef/text \\
          $(SDK_ROOT)/components/libraries/mutex \\
          $(SDK_ROOT)/components/libraries/gpiote \\
          $(SDK_ROOT)/components/libraries/bootloader/ble_dfu \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/common \\
          $(SDK_ROOT)/components/boards \\
          $(SDK_ROOT)/components/nfc/ndef/generic/record \\
          $(SDK_ROOT)/components/nfc/t4t_parser/cc_file \\
          $(SDK_ROOT)/components/ble/ble_advertising \\
          $(SDK_ROOT)/external/utf_converter \\
          $(SDK_ROOT)/components/ble/ble_services/ble_bas_c \\
          $(SDK_ROOT)/modules/nrfx/drivers/include \\
          $(SDK_ROOT)/components/libraries/experimental_task_manager \\
          $(SDK_ROOT)/components/ble/ble_services/ble_hrs_c \\
          $(SDK_ROOT)/components/softdevice/s140/headers/nrf52 \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/le_oob_rec \\
          $(SDK_ROOT)/components/libraries/queue \\
          $(SDK_ROOT)/components/libraries/pwr_mgmt \\
          $(SDK_ROOT)/components/ble/ble_dtm \\
          $(SDK_ROOT)/components/toolchain/cmsis/include \\
          $(SDK_ROOT)/components/ble/ble_services/ble_rscs_c \\
          $(SDK_ROOT)/components/ble/common \\
          $(SDK_ROOT)/components/ble/ble_services/ble_lls \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/ac_rec \\
          $(SDK_ROOT)/components/ble/ble_services/ble_bas \\
          $(SDK_ROOT)/components/libraries/mpu \\
          $(SDK_ROOT)/components/libraries/experimental_section_vars \\
          $(SDK_ROOT)/components/ble/ble_services/ble_ans_c \\
          $(SDK_ROOT)/components/libraries/slip \\
          $(SDK_ROOT)/components/libraries/delay \\
          $(SDK_ROOT)/components/libraries/csense_drv \\
          $(SDK_ROOT)/components/libraries/memobj \\
          $(SDK_ROOT)/components/ble/ble_services/ble_nus_c \\
          $(SDK_ROOT)/components/softdevice/common \\
          $(SDK_ROOT)/components/ble/ble_services/ble_ias \\
          $(SDK_ROOT)/components/libraries/usbd/class/hid/mouse \\
          $(SDK_ROOT)/components/libraries/low_power_pwm \\
          $(SDK_ROOT)/components/nfc/ndef/conn_hand_parser/ble_oob_advdata_parser \\
          $(SDK_ROOT)/components/ble/ble_services/ble_dfu \\
          $(SDK_ROOT)/external/fprintf \\
          $(SDK_ROOT)/components/libraries/svc \\
          $(SDK_ROOT)/components/libraries/atomic \\
          $(SDK_ROOT)/components \\
          $(SDK_ROOT)/components/libraries/scheduler \\
          $(SDK_ROOT)/components/libraries/cli \\
          $(SDK_ROOT)/components/ble/ble_services/ble_lbs \\
          $(SDK_ROOT)/components/ble/ble_services/ble_hts \\
          $(SDK_ROOT)/components/libraries/crc16 \\
          $(SDK_ROOT)/components/nfc/t4t_parser/apdu \\
          $(SDK_ROOT)/components/libraries/util \\
          $(SDK_ROOT)\\config\\nrf52840\\config2 \\
          $(SDK_ROOT)/components/libraries/usbd/class/cdc \\
          $(SDK_ROOT)/components/libraries/csense \\
          $(SDK_ROOT)/components/libraries/balloc \\
          $(SDK_ROOT)/components/libraries/ecc \\
          $(SDK_ROOT)/components/libraries/hardfault \\
          $(SDK_ROOT)/components/ble/ble_services/ble_cscs \\
          $(SDK_ROOT)/components/libraries/hci \\
          $(SDK_ROOT)/components/libraries/timer \\
          $(SDK_ROOT)/components/softdevice/s140/headers \\
          $(SDK_ROOT)/integration/nrfx \\
          $(SDK_ROOT)/components/nfc/t4t_parser/tlv \\
          $(SDK_ROOT)/components/libraries/sortlist \\
          $(SDK_ROOT)/components/libraries/spi_mngr \\
          $(SDK_ROOT)/components/libraries/led_softblink \\
          $(SDK_ROOT)/components/nfc/ndef/conn_hand_parser \\
          $(SDK_ROOT)/components/libraries/sdcard \\
          $(SDK_ROOT)/components/nfc/ndef/parser/record \\
          $(SDK_ROOT)/modules/nrfx/mdk \\
          $(SDK_ROOT)/components/ble/ble_services/ble_cts_c \\
          $(SDK_ROOT)/components/ble/ble_services/ble_nus \\
          $(SDK_ROOT)/components/libraries/twi_mngr \\
          $(SDK_ROOT)/components/ble/ble_services/ble_hids \\
          $(SDK_ROOT)/components/libraries/strerror \\
          $(SDK_ROOT)/components/libraries/crc32 \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/ble_oob_advdata \\
          $(SDK_ROOT)/components/nfc/t2t_parser \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/ble_pair_msg \\
          $(SDK_ROOT)/components/libraries/usbd/class/audio \\
          $(SDK_ROOT)/components/nfc/t4t_lib \\
          $(SDK_ROOT)/components/ble/peer_manager \\
          $(SDK_ROOT)/components/libraries/mem_manager \\
          $(SDK_ROOT)/components/libraries/ringbuf \\
          $(SDK_ROOT)/components/ble/ble_services/ble_tps \\
          $(SDK_ROOT)/components/nfc/ndef/parser/message \\
          $(SDK_ROOT)/components/ble/ble_services/ble_dis \\
          $(SDK_ROOT)/components/nfc/ndef/uri \\
          $(SDK_ROOT)/components/ble/nrf_ble_gatt \\
          $(SDK_ROOT)/components/ble/nrf_ble_qwr \\
          $(SDK_ROOT)/components/libraries/gfx \\
          $(SDK_ROOT)/components/libraries/button \\
          $(SDK_ROOT)/modules/nrfx \\
          $(SDK_ROOT)/components/libraries/twi_sensor \\
          $(SDK_ROOT)/integration/nrfx/legacy \\
          $(SDK_ROOT)/components/libraries/usbd/class/hid/kbd \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/ep_oob_rec \\
          $(SDK_ROOT)/external/segger_rtt \\
          $(SDK_ROOT)/components/libraries/atomic_fifo \\
          $(SDK_ROOT)/components/ble/ble_services/ble_lbs_c \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/ble_pair_lib \\
          $(SDK_ROOT)/components/libraries/crypto \\
          $(SDK_ROOT)/components/ble/ble_racp \\
          $(SDK_ROOT)/components/libraries/fds \\
          $(SDK_ROOT)/components/nfc/ndef/launchapp \\
          $(SDK_ROOT)/components/libraries/atomic_flags \\
          $(SDK_ROOT)/components/ble/ble_services/ble_hrs \\
          $(SDK_ROOT)/components/ble/ble_services/ble_rscs \\
          $(SDK_ROOT)/components/nfc/ndef/connection_handover/hs_rec \\
          $(SDK_ROOT)/components/libraries/usbd \\
          $(SDK_ROOT)/components/nfc/ndef/conn_hand_parser/ac_rec_parser \\
          $(SDK_ROOT)/components/libraries/stack_guard \\
          $(SDK_ROOT)/components/libraries/log/src \\
        `);
    }

    //TODO Consider allowing user to edit list of lib files
    protected getLibFiles(): string {
        return "";
    }

    //TODO generate it automatically
    protected getSourceFiles(): string {
        return(
`         $(SDK_ROOT)/modules/nrfx/mdk/gcc_startup_nrf52840.S \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_backend_rtt.c \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_backend_serial.c \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_backend_uart.c \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_default_backends.c \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_frontend.c \\
          $(SDK_ROOT)/components/libraries/log/src/nrf_log_str_formatter.c \\
          $(SDK_ROOT)/components/libraries/button/app_button.c \\
          $(SDK_ROOT)/components/libraries/util/app_error.c \\
          $(SDK_ROOT)/components/libraries/util/app_error_handler_gcc.c \\
          $(SDK_ROOT)/components/libraries/util/app_error_weak.c \\
          $(SDK_ROOT)/components/libraries/scheduler/app_scheduler.c \\
          $(SDK_ROOT)/components/libraries/timer/app_timer.c \\
          $(SDK_ROOT)/components/libraries/util/app_util_platform.c \\
          $(SDK_ROOT)/components/libraries/hardfault/hardfault_implementation.c \\
          $(SDK_ROOT)/components/libraries/util/nrf_assert.c \\
          $(SDK_ROOT)/components/libraries/atomic_fifo/nrf_atfifo.c \\
          $(SDK_ROOT)/components/libraries/atomic_flags/nrf_atflags.c \\
          $(SDK_ROOT)/components/libraries/atomic/nrf_atomic.c \\
          $(SDK_ROOT)/components/libraries/balloc/nrf_balloc.c \\
          $(SDK_ROOT)/external/fprintf/nrf_fprintf.c \\
          $(SDK_ROOT)/external/fprintf/nrf_fprintf_format.c \\
          $(SDK_ROOT)/components/libraries/memobj/nrf_memobj.c \\
          $(SDK_ROOT)/components/libraries/pwr_mgmt/nrf_pwr_mgmt.c \\
          $(SDK_ROOT)/components/libraries/ringbuf/nrf_ringbuf.c \\
          $(SDK_ROOT)/components/libraries/experimental_section_vars/nrf_section_iter.c \\
          $(SDK_ROOT)/components/libraries/strerror/nrf_strerror.c \\
          $(SDK_ROOT)/modules/nrfx/mdk/system_nrf52840.c \\
          $(SDK_ROOT)/components/boards/boards.c \\
          $(SDK_ROOT)/integration/nrfx/legacy/nrf_drv_clock.c \\
          $(SDK_ROOT)/integration/nrfx/legacy/nrf_drv_uart.c \\
          $(SDK_ROOT)/modules/nrfx/soc/nrfx_atomic.c \\
          $(SDK_ROOT)/modules/nrfx/drivers/src/nrfx_clock.c \\
          $(SDK_ROOT)/modules/nrfx/drivers/src/nrfx_gpiote.c \\
          $(SDK_ROOT)/modules/nrfx/drivers/src/prs/nrfx_prs.c \\
          $(SDK_ROOT)/modules/nrfx/drivers/src/nrfx_uart.c \\
          $(SDK_ROOT)/modules/nrfx/drivers/src/nrfx_uarte.c \\
          $(PROJ_DIR)/main.c \\
          $(SDK_ROOT)/external/segger_rtt/SEGGER_RTT.c \\
          $(SDK_ROOT)/external/segger_rtt/SEGGER_RTT_Syscalls_GCC.c \\
          $(SDK_ROOT)/external/segger_rtt/SEGGER_RTT_printf.c \\
          $(SDK_ROOT)/components/ble/common/ble_advdata.c \\
          $(SDK_ROOT)/components/ble/common/ble_conn_params.c \\
          $(SDK_ROOT)/components/ble/common/ble_conn_state.c \\
          $(SDK_ROOT)/components/ble/common/ble_srv_common.c \\
          $(SDK_ROOT)/components/ble/nrf_ble_gatt/nrf_ble_gatt.c \\
          $(SDK_ROOT)/components/ble/nrf_ble_qwr/nrf_ble_qwr.c \\
          $(SDK_ROOT)/external/utf_converter/utf.c \\
          $(SDK_ROOT)/components/ble/ble_services/ble_lbs/ble_lbs.c \\
          $(SDK_ROOT)/components/softdevice/common/nrf_sdh.c \\
          $(SDK_ROOT)/components/softdevice/common/nrf_sdh_ble.c \\
          $(SDK_ROOT)/components/softdevice/common/nrf_sdh_soc.c \\
        `);
    }

}