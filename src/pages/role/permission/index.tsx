import {Button, Tree} from 'antd';
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useRequest} from 'ahooks';
import {getMenuList} from '@/service/menu';
import {updateRolePermission} from '@/service/role';


const App = () => {
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [searchParams] = useSearchParams();
  const [list, setList] = useState([]);
  const id = searchParams.get('id') || '';
  console.log(searchParams.get('id'));

  const {run, loading} = useRequest(() => getMenuList(), {
    manual: true,
    onSuccess: data => {
      console.log(data);
      const tree = getTree(data.data);
      setList([...tree]);
      console.log(tree);
    }
  });

  const getTree = (data: any[]) => {
    return data.length > 0 && data.map(item => {
      if (item.childMenus && item.childMenus.length > 0) {
        return {title: item.title, key: item.id, children: getTree(item.childMenus)};
      }
      return {title: item.title, key: item.id, children: []};
    });
  };

  useEffect(() => {
    run();
  }, [searchParams.get('id')]);


  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleSubmit = async () => {
    const menus = checkedKeys.map(item => {
      return {id: item};
    });
    await updateRolePermission({id: id, menus});
  };


  return (
    <>
      <Tree
        checkable
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={list}
      />
      <Button onClick={handleSubmit} type="primary">确定</Button>
    </>
  );
};

export default App;
