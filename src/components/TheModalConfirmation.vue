<template>
    <!-- Background -->
    <transition
        @css="false"
        mode="out-in"
        @enter="showBackground"
        @leave="hiddenBackground"
        appear
    >
        <div 
            v-if="show || isModalShowed"
            class="fixed top-0 left-0 z-50 w-screen h-screen bg-opacity-20 bg-semitransparent"
            style="z-index:70"
            @click.self="$emit('clickOut')"
        >
            <!-- Modal -->
            <transition
                @css="false"
                mode="out-in"
                @enter="showModal"
                @leave="hiddenModal"
                appear
            >
                <div
                    v-if="show"
                    class="absolute overflow-hidden transform -translate-x-1/2 -translate-y-1/2 border rounded-md border-primary-300 text-primary-300 bg-primary-50 overflow-ellipsis top-1/2 left-1/2"
                    style="min-width: 80%; max-width:80%"
                >
                    <!-- Modal title -->
                    <div class="pl-2 text-xl">
                        <slot name="title">
                        </slot>
                    </div>

                    <!-- Content -->
                    <div class="px-2 py-2 text-sm" style="text-indent: 5px">
                        <slot name="content">
                        </slot>
                    </div>

                    <div class="px-4 text-primary-300">
                        <!-- <hr/>  -->
                    </div>

                    <!-- Actions -->
                    <div class="grid grid-cols-3 px-2 py-2">
                        <slot name="action">
                            <q-btn
                                flat
                                outline
                                class="col-start-2"
                                color="primary-100"
                                @click="$emit('cancel')"
                            >
                                Cancelar
                            </q-btn>
                            <q-btn
                                unelevated
                                color="primary-100"
                                @click="$emit('confirm')"
                            >
                                Confirmar
                            </q-btn>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import gsap from 'gsap';

export default {
    data(){
        return {
            isModalShowed: false
        }
    },
    props:{
        show: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        showModal: function(el, done){
            gsap.from(el, {
                scale: 0,
                duration: .2,
                onComplete: done
            })
        },
        hiddenModal: function(el, done){
            const hidden = () => {
                this.isModalShowed = false;
                done();
            }

            gsap.to(el, {
                scale: 0,
                duration: .2,
                onComplete: hidden
            })
        },
        showBackground: function(el, done){
            gsap.from(el, {
                opacity: 0,
                duration: .2,
                onComplete: done
            })
        },
        hiddenBackground: function(el, done){
            gsap.to(el, {
                opacity: 0,
                duration: .2,
                onComplete: done
            })
        }
    },
    watch: {
        show(){
            if(this.show){
                this.isModalShowed = this.show;
            }
        }
    }
}
</script>