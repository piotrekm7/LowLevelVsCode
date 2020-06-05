import * as glob from "glob";
import * as fs from "fs-extra";

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

    public performScanning(): void {
        /*
                Scans the project and makes
                lists of required include folders and source files.
             */

        const filesForScanning: string[] = [];
        const required_source: Set<string> = new Set<string>();
        const required_headers: Set<string> = new Set<string>();
        const headers_directories: Set<string> = new Set<string>();

        const project_sources = this.findAllSourcesInProject();
        filesForScanning.push(...project_sources);
        project_sources.forEach((file) => required_source.add(file));

        while (filesForScanning.length) {
            const sourceCode = fs.readFileSync(filesForScanning.shift()!, "utf-8");
            const headers = this.findHeadersInFile(sourceCode);
            for (const header of headers) {
                if (!required_headers.has(header)) {
                    required_headers.add(header);
                    let filepath = this.findFileInFolderOrSubfolders(
                        header,
                        this.sourceFolder
                    );
                    if (filepath) {
                        headers_directories.add(this.getDirectoryPath(filepath));
                    } else {
                        for (const directory of this.dependenciesFolders) {
                            filepath = this.findFileInFolderOrSubfolders(header, directory);
                            if (filepath) {
                                headers_directories.add(this.getDirectoryPath(filepath));
                                break;
                            }
                        }
                    }
                }
            }
        }

        this.sourceFiles.push(...required_source);
        this.includeFolders.push(...headers_directories);
    }

    private getDirectoryPath(filepath: string): string {
        /*
            Returns path to directory of file
             */
        return filepath.match(/(.*)[\/\\]/)![1] || "";
    }

    private findFileInFolderOrSubfolders(
        filename: string,
        folderPath: string
    ): string | null {
        /*
            Performs search for specific file in folder and all its subfolders
            */
        const search_result = glob.sync(`${folderPath}/**/${filename}`, {});
        if (search_result) {
            return search_result[0];
        }
        return null;
    }

    private findAllSourcesInProject(): string[] {
        /*
            Scans the projects and returns list of source files
             */
        return glob.sync(`${this.sourceFolder}/**/*.c`, {});
    }

    private findHeadersInFile(sourceCode: string): string[] {
        /*
            Scans the source code for #include directives and returns list of headers.
             */
        const regexp = /#include\s"(.+?)"/g;
        const includes = [...sourceCode.matchAll(regexp)];
        return includes.map((m) => m[1]);
    }
}
