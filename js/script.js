Vue.component('note',{
    props:["todo"],
    template:`<div class="ui card">
                <div class="content">
                    <div class="header">{{titleLength || '新建笔记'}}</div>
                    <div class="meta">
                        <span>{{createDate}}</span>
                        <span>字数统计:{{todo.title.length}}</span>
                    </div>
                    <textarea rows="5" v-model="todo.title" @keyup="modify"></textarea>
                    <i class="trash icon" title="删除笔记" @click="del"></i>
                </div>
            </div>`,
        computed:{
            titleLength:function(){
                return _.truncate(this.todo.title,{'length':16})
            },
            createDate:function(){
                return moment(this.todo.time).fromNow();
            },
            getDate:function(){
                return Date.parse(new Date());
            }
        },
        methods:{
            del:function(){
                console.log(this)
                app.notes.splice(this._uid - 1, 1);
                localStorage.setItem('notes',JSON.stringify(app.notes))
            },
            modify:function(){
                //console.log(this.todo.title)
                app.notes[this._uid - 1].title = this.todo.title
                app.notes[this._uid -1].time=this.getDate
                localStorage.setItem('notes',JSON.stringify(app.notes))
            }
        }

});
var app=new Vue({
    el:"#app",
    data:{
        notes:[
            {
                "title":"中国古代四大剑圣：1.盖聂，战国末年著名剑术家，现榆次人，因慕战国初著名刺客聂政而得名。当时卫国人荆轲也颇喜欢读书和击剑，闻盖聂以剑术著称，不远万里来榆次拜访。两人赤诚相见，倾心相识，还经常比试剑术，切磋技艺。",
                "time":1537776075000
            },
            {
                "title":"中国古代四大剑圣：2.荆轲，战国末期卫人，先世为齐人，喜好读书击剑。卫人称之为“庆卿”，后游历到燕国，被当地称为“荆卿”（或荆叔）。后来，由燕国智勇深沉的“节侠”田光推荐给太子丹，拜为上卿。秦国灭赵后，直逼燕国南界，太子丹震惧，与田光密谋，派他入秦行刺。秦将樊於期因得罪秦王政，叛逃至燕。荆轲献计太子丹，拟以樊於期之头及燕督亢（今河北涿县、易县、固安一带）地图进献秦王，相机行刺。太子丹不忍杀樊，荆轲便私见樊於期，将实情相告，樊於期立即自刎。公元前227年，荆轲带燕督亢地图和樊於期首级，前往秦国进献。秦王大喜，在咸阳宫隆重召见。献图时，图穷匕首见，刺秦王不中，被杀。“风萧萧兮易水寒，壮士一去兮不复还”，是高渐离送别荆轲时所吟唱的诗句。",
                "time":1537776075000
            },
            {
                "title":"中国古代四大剑圣：3.公孙大娘，公孙大娘是开元盛世时的唐宫第一舞人。善舞剑器，舞姿惊动天下。以舞《剑器》而闻名于世。她在民间献艺，观者如山。应邀到宫廷表演，无人能比。她在继承传统剑舞的基础上，创造了多种《剑器》舞，如《西河剑器》，《剑器浑脱》等。",
                "time":1537776075000
            },
            {
                "title":"中国古代四大剑圣：4.裴旻，唐开元间人。据《独异志》载，他“掷剑入云，高数十丈，若电光下射，漫引手执鞘承之，剑透空而入，观者千百人，无不凉惊栗”。又据《历代名画记》，画家吴道子因见裴旻剑舞，“出没神怪既毕，乃“挥毫益进”。诗人李白曾从其学剑。文宗时，称李白的诗、张旭的草书、裴旻的剑舞为“三绝”。裴并以善射著名。任北平守时，北平多虎，他一日射虎三十一头。见《新唐书·李白传》。 ",
                "time":1537776075000
            }
        ]
    },
    methods:{
        add:function(){
            this.notes.unshift({"title":"","time":Date.parse(new Date())});
            localStorage.setItem('notes',JSON.stringify(this.notes));
            console.log(JSON.parse(localStorage.getItem("notes")));
            if(document.querySelector("textarea") !==null){
                document.querySelector("textarea").focus()
            }
        }
    },
    created:function(){
        //localStorage.setItem('notes',JSON.stringify(this.notes));
        if(localStorage.getItem("notes")!== null){
            this.notes=JSON.parse(localStorage.getItem("notes"));
        }

    }
})
autosize(document.querySelectorAll('textarea'));