import * as glob from "glob";

export class DependencyAnalyzer {
    /*
    A class for performing analysis of the project's source code
    in order to create list of required dependencies from external sdk.
     */
    private readonly sourceFolder: string;
    private readonly dependenciesFolders: string[];

    private includeFolders: string[] = [];
    private sourceFiles: string[] = [];

    constructor(sourceFolder: string, dependenciesFolders: string[]) {
        /*
        Initializes class DependencyAnalyzer
        Args:
            sourceFolder - Folder which contains project source code
            dependenciesFolders - Folders with sdk, which project depends on
         */
        this.sourceFolder = sourceFolder;
        this.dependenciesFolders = dependenciesFolders;
        this.performScanning();
    }

    public getListOfIncludeFolders(): string[] {
        /*
        Returns list of folders containing required headers by the project.
         */
        return this.includeFolders;
    }

    public getListOfSourceDependencies(): string[] {
        /*
        Returns list of source files which are required for successful compilation and linking.
         */
        return this.sourceFiles;
    }

    private performScanning(): void {
        /*
            Scans the project and makes
            lists of required include folders and source files.
         */

        const filesForScanning: string[] = [];
        const required_source: Set<string> = new Set();
        const required_headers: Set<string> = new Set();

        const project_sources = this.findAllSourcesInProject();
        filesForScanning.push(...project_sources);
        project_sources.forEach(file => required_source.add(file));

        while (filesForScanning.length) {
            const headers = this.findHeadersInFile(filesForScanning.shift()!);
            
        }

        this.sourceFiles.push(...required_source);

    }

    private findAllSourcesInProject(): string[] {
        /*
        Scans the projects and returns list of source files
         */
        return glob.sync(this.sourceFolder + '/**/*.c', {});
    }

    private findHeadersInFile(source: string): string[] {
        /*
        Scans the source code for #include directives and returns list of headers.
         */
        const regexp = /#include\s"(.+?)"/g;
        const includes = [...source.matchAll(regexp)];
        return includes.map(m => m[1]);
    }


}