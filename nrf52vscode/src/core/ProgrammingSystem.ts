
abstract class ProgrammingSystem {
    /*
    Basic class, which is used by extension to retrieve available tasks (implemented in sub classes) and
    perform the chosen one.
     */
    public getAvailableTasksList(): Array<string>{
        /*
        Returns Array of strings which corresponds to available tasks.
         */
        return Array.from(this.taskMap.keys());
    }
    public runTask(taskName: string): boolean|null{
        /*
        Runs selected task.
         */
        let task = this.taskMap.get(taskName);
        if(task != null){
            return task();
        }
        else{
            return null;
        }
    }
    protected taskMap = new Map<string, () => boolean>();
}

export default ProgrammingSystem;