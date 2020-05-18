import {DependencyAnalyzer} from "../../core/DependencyAnalyzer";
import * as assert from 'assert';

suite('DependencyAnalyzer searching for headers Test Suite', () => {
    const dependencyAnalyzer = new DependencyAnalyzer('', ['']);

    test('Check finding proper includes', () => {
        const source = [
            '#include "header1"',
            '#include "header2"',
        ];
        const output = dependencyAnalyzer['findHeadersInFile'](source.join('\n'));
        const expected = ['header1', 'header2'];
        assert.equal(output, expected);
    });

    test('Check ignoring <> includes', () => {
        const source = [
            '#include "header1"',
            '#include <header2>"',
        ];
        const output = dependencyAnalyzer['findHeadersInFile'](source.join('\n'));
        const expected = ['header1'];
        assert.equal(output, expected);
    });
    test('Check ignoring one line comments', () => {
        const source = [
            '#include "header1" // comment',
            '//#include "header2"',
            '   //#include "header2"',
        ];
        const output = dependencyAnalyzer['findHeadersInFile'](source.join('\n'));
        const expected = ['header1'];
        assert.equal(output, expected);
    });

});
