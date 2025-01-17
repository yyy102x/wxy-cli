import {input,select} from '@inquirer/prompts'
import {clone} from '../utils/clone'
import path from 'path'
import fs from 'fs-extra'
export interface TemplateInfo{
    name:string,//模板名称
    downloadUrl:string,//模板地址
    description:string,//模板描述
    branch:string,//模板分支
}


export const templates:Map<string,TemplateInfo> = new Map([
    ['Vite-Vue3-Typescript-template',{
        name:'Vite-Vue3-Typescript-template',
        downloadUrl:'https://gitee.com/wxywangpp/finance_api.git',
        description:'基于Vite+Vue3+Typescript的模板',
        branch:'develop'
    }],
    ['Vite-temp',{
        name:'Vite-Vue3-Typescript-template',
        downloadUrl:'https://gitee.com/wxywangpp/finance_api.git',
        description:'基于Vite+Vue3+Typescript的模板',
        branch:'master'
    }]
])

export function isOverwrite(fileName:string){
    console.warn(`${fileName}已经存在`)
    return select({
        message:'是否覆盖',
        choices:[
            {name:'覆盖',value:true},
            {name:'不覆盖',value:false}
        ]
    })
}


export default async function create(projectName?: string) {
    // 初始化模板列表
    const templateList = Array.from(templates).map((item:[string,TemplateInfo])=>{
        const [name,info] = item;
        return {
            name,
            value:name,
            description:info.description
        }
    })
    if(!projectName){
        projectName=await input({message:'请输入项目名称'}) 
    }

    // 如果文件夹存在 则提示是否覆盖
    const filePath=path.resolve(process.cwd(),projectName)
    if(fs.existsSync(filePath)){
        const run=await isOverwrite(projectName)
        if(run){
            await fs.remove(filePath)
        }else{
            return//不覆盖直接退出
        }

    }

    const templateName = await select({message:'请选择模板',choices:templateList})
    const info= templates.get(templateName)
    console.log(info)
    if(info){
        clone(info.downloadUrl,projectName,['-b',info.branch])
    }
    console.log('create',projectName);
    
}