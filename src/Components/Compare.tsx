import { Button } from 'antd';
import 'antd/dist/antd.css';
import { PlayCircleOutlined } from '@ant-design/icons';

export function Compare() {
    return (
        <Button
            type="primary"
            style={{ "marginTop": "10px", "width": "110px"}}
            icon={<PlayCircleOutlined />}
            onClick={handleCompare}
            >
            Compare
        </Button>
    )
}

async function handleCompare(value: any) {
    return;
}