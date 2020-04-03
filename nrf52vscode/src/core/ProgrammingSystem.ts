abstract class ProgrammingSystem {
    /*
    Basic class, which is used by extension to retrieve available tasks (implemented in sub classes) and
    perform the chosen one.
     */

    public constructor() {
        this.addSettings();
    }

    private addSettings(): void {
        /*
        Adds settings required by ProgrammingSystem.
        Function is used only at initialization.
         */
        this.settings.set('ProjectName', 'newProject');
    }

    public getAvailableTasksList(): Array<string> {
        /*
        Returns Array of strings which corresponds to available tasks.
         */
        return Array.from(this.taskMap.keys());
    }

    public runTask(taskName: string): boolean | null {
        /*
        Runs selected task.
         */
        let task = this.taskMap.get(taskName);
        if (task != null) {
            return task();
        } else {
            return null;
        }
    }

    public getSettings(): Map<string, string | number> {
        /*
        Returns copy of system settings.
         */
        return new Map(this.settings);
    }

    public updateSettings(newSettings: Map<string, string | number>): void {
        /*
        Updates system settings.
         */
        this.settings = new Map([...this.settings, ...newSettings]);
    }

    protected taskMap = new Map<string, () => boolean>();
    protected settings = new Map<string, string | number>();
}

export default ProgrammingSystem;