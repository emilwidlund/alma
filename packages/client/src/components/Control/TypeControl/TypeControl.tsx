import { HiveOutlined } from '@mui/icons-material';
import { Type } from '@thi.ng/shader-ast';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { TypeControlProps } from './TypeControl.types';
import { BaseControl } from '../BaseControl/BaseControl';
import { Select } from '~/components/Select/Select';

export const TypeControl = observer(({ node }: TypeControlProps) => {
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (node.data.type) {
                node.data.type.selected = e.target.value as Type;
            }
        },
        [node]
    );

    return (
        <BaseControl title="Type">
            <Select className="w-40" onChange={onChange} value={node?.data.type?.selected} icon={HiveOutlined}>
                {node.data.type?.options.map(type => (
                    <option key={type} value={type}>
                        {type.toUpperCase()}
                    </option>
                ))}
            </Select>
        </BaseControl>
    );
});
