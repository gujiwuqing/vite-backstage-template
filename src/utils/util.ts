
// 获取tabList
//menus有children的时候，children的path是不是在tabs里面，如果在，就把父级的path放进去
export const getTabList =(tabs=[],menus=[])=>{
    let tabList: any[] = [];
    menus.forEach((item)=>{
        if (item.children){
            item.children.map(child=>{
                if (tabs.includes(child.key)){
                    tabList.push(child)
                }
            })
        }else {
            if (tabs.includes(item.key)){
                tabList.push(item)
            }
        }
    }
    )
    return tabList;
}


