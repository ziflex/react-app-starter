/* eslint-disable import/no-extraneous-dependencies */
import cssImport from 'postcss-import';
import cssEach from 'postcss-each';
import cssMixins from 'postcss-mixins';
import cssNested from 'postcss-nested';
import cssReference from 'postcss-reference';
import cssVariables from 'postcss-simple-vars';
import cssMqpacker from 'css-mqpacker';
import cssAutoprefixer from 'autoprefixer';
import cssLaggard from 'laggard';

export default function defaultPostcssPlugins() {
    return [
        cssImport,
        cssEach,
        cssMixins,
        cssNested,
        cssReference,
        cssVariables,
        cssMqpacker,
        cssAutoprefixer({ browsers: ['last 2 versions'] }),
        cssLaggard
    ];
}
