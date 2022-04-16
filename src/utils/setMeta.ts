import { useMeta } from 'vue-meta'
import {ComputedRef} from 'vue'

interface syncValue {
  title?:string,
  description?:string,
  keywords?:string,
  path?:string,
}

type ParamType = syncValue | ComputedRef<syncValue>;

function instanceOfComputedRef(object: syncValue | ComputedRef<syncValue>): object is ComputedRef<syncValue> {
  return 'value' in object;
}

const setMeta = (param:ParamType={
  title:'식물의언어 : 식집사를 위한 식물 정보 플랫폼',
  description:'식집사를 위한 식물 정보 플랫폼, 식물의언어를 찾아오세요',
  keywords:"식물의언어, 식물의 언어, 식물, plantslang",
  path:''
}) => {
  console.log(param);
  if(instanceOfComputedRef(param)){
    console.log(param.value)
    useMeta(param);
  }else{
    const metaInfo = param as Omit<syncValue,'path'> & {path:string};
    useMeta({
      title: metaInfo.title,
      description:metaInfo.description,
      meta: [
        {vmid: 'keywords', property: 'keywords', content: metaInfo.keywords},
        {vmid: 'og:title', property: 'og:title', content: metaInfo.title},
        {vmid: 'og:description', property: 'og:description', content: metaInfo.description},
        {vmid: 'og:url', property: 'og:url', content: process.env.VUE_APP_BASE_URL + metaInfo.path}
      ]
    })
  }
  
  
}

export default setMeta;