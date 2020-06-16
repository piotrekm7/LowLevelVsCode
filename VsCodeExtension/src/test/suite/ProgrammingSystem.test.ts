import {ProgrammingSystem} from "../../core/ProgrammingSystem";
import * as assert from 'assert';

class ProgrammingSystemImplementation extends ProgrammingSystem {
    generateMakefile(location: string): boolean {
        return false;
    }
}

suite('ProgrammingSystem Test Suite', () => {
    const programmingSystem = new ProgrammingSystemImplementation();
    test('Check if can preserves other settings', () => {
        programmingSystem.updateSettings(new Map());
        assert.notEqual(programmingSystem.getSettings().get('ProjectName'), undefined);
    });
    test('Check if can update projectName', () => {
        const projectName = 'SuperProjectNameForTestSuite';
        programmingSystem.updateSettings(new Map([['ProjectName', projectName]]));
        assert.equal(programmingSystem.getSettings().get('ProjectName'), projectName);
    });

});
