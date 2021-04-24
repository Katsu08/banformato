<template>
  <div>
    <main>
      <div class="selecter">
        <div class="selecter__container">
          <q-icon 
            class="selecter__icon selecter__icon--bank" 
            :name="fasUniversity"
            @click="bankDropdown.show = true"
          />
          <div 
            class="selecter__name-selected"
            @click="bankDropdown.show = true"
            >
            {{bankDropdown.selected.name}}
          </div>
          <q-icon class="selecter__icon selecter__icon--userTag" :name="fasUserTag"/>
        </div>

        <!-- Dropdown List -->
        <div class="selecter__bank-list">
          <BankDropdown
            :show="bankDropdown.show"
            @close="bankDropdown.show = false"
            @select="selectBank($event)"
          />
        </div>
      </div>
      <div class="textArea">
        <textarea 
          v-model="textarea"
          name="translator"
          resizable='false'
          class="textArea__field"
        />
        <!-- Actions Buttons -->
        <q-icon 
          v-if="!isTextAreaEmpty"
          @click="clear"
          :name="fasTimes" 
          class="textArea__action textArea__action--close"
        />
        <div class="textArea__action--bottomContainer">
          <span class="textArea__action--group">
            <q-icon 
              :name="farHeart" 
              :class="[isDataComplete? 'textArea__action':'textArea__action--disable', 'textArea__action--save']"
              @click="save"
            />
            <q-icon 
              v-if="!isTextAreaEmpty"
              @click="copy(textarea)"
              :name="fasCopy" 
              :class="[isSelectedBank && !isTextAreaEmpty? 'textArea__action':'textArea__action--disable', 'textArea__action--copy']"
            />
            <q-icon
              v-else
              :name="fasPaste"   
              :class="[!isEmptyClipboard? 'textArea__action':'textArea__action--disable', 'textArea__action--copy']"
              @click="paste"
            />
          </span>
        </div>
      </div>
    </main>

    <pre>
      {{contacts.list}}
    </pre>

    <footer class="footer font-footer">
      <div class="footer__text--container">Developed By: <span class="footer__link">Katsu</span></div>
    </footer>

    <ModalConfirmation 
      :show="contacts.modal.show"
      @clickOut="saveCancel"
      @confirm="saveConfirm"
    >
      <template #title>
        <p class="modal__title">
          <q-icon class="modal__title--icon" :name="fasAddressCard"/> Guardar pagomovil
        </p>
      </template>

      <template #content>
        <p class="modal__description">
          Ponerle un nombre te ayudará a identificarlo más fácilmente
        </p>
        <div class="modal__container">
          <input 
            type="text"
            class="modal__input"
            placeholder=""
            v-model="contacts.modal.newContactInfo.name"
          >
        </div>
      </template>
    </ModalConfirmation>

  </div>
</template>


<script>
import { fasAddressCard, fasUniversity, fasUserTag, farHeart, fasCopy, fasTimes, fasPaste } from '@quasar/extras/fontawesome-v5';
import BankDropdown from 'components/TheBankDropdown';
import ModalConfirmation from 'components/TheModalConfirmation';

export default {
  name: 'PageIndex',
  components:{
    BankDropdown,
    ModalConfirmation
  },
  data(){
    return{
      bankDropdown: {
        selected: {
          name: 'Selecciona un banco',
          format: null,
          img: '',
          id: null
        },
        show: false
      },
      pagomovil: {
        ci: '',
        bank: '',
        phone: '',
        amount: ''
      },
      textarea: '',
      regExp: {
        phone: /04\d{9}/,
        ci: /\bv?[1-9]\d{6,7}/i,
        bank: /01\d{2}/,
        amount: /\d+,00/
      },
      clipboard: '',
      contacts: {
        modal: {
          show: false,
          newContactInfo: {
            name: '',
            pagomovil: '',
          }
        },
        list: [
          // {
          //   name: 'example',
          //   pagomovil: '0102 04244556213 8561378',
          //   id: 0
          // }
        ]
      }
    }
  },
  methods:{
    selectBank(bank){
      this.bankDropdown.selected = JSON.parse(JSON.stringify(bank));
      this.bankDropdown.show = false;

      this.$q.localStorage.set('defaultBank', bank);
    },
    copy(text){
      if(this.$q.cordova){
        if(this.isSelectedBank && !this.isTextAreaEmpty){
          cordova.plugins.clipboard.copy(this.formatedText(text), () => {
            if(!this.isDataComplete){
              this.$q.notify({
                message: 'El formato fue copiado con éxito, sin embargo, algunos datos no fueron encontrados. Recuerde reemplazar las palabras por el dato correcto antes de enviar el mensaje',
                type: 'warning'
              });
            } else{
              this.$q.notify({
                message: 'Ha sido copiado con éxito',
                type: 'positive'
              });
            }
          }, () => {this.$q.notify('fallido')});        
        } else{
          if(this.isTextAreaEmpty) this.$q.notify('Debe escribir el mensaje que desea formatear en el campo de texto'); 
          else if(!this.isSelectedBank) this.$q.notify('Debe seleccionar el banco desde el que desea hacer el pagomovil')
        }
      } else{
        alert('Si te aparece este error desde tu Android, contacta con el desarrollador katsukeinz@gmail.com')
      }
    },
    paste(){
      if(this.$q.cordova){
        cordova.plugins.clipboard.paste(text => this.textarea = text);
      } else{
        alert('Si te aparece este error desde tu Android, contacta con el desarrollador katsukeinz@gmail.com')
      }
    },
    clear(){
      this.textarea = '';
    },
    save(){
      if(this.isDataComplete){
        const bank = (this.textarea.match(this.regExp.bank) || [''])[0].trim();
        const ci = (this.textarea.match(this.regExp.ci) || [''])[0].trim().replace(/v/i, '');
        const phone = (this.textarea.match(this.regExp.phone) || [''])[0].trim();
        
        if(bank.length > 0 && ci.length > 0 && phone.length > 0){
          this.contacts.modal.newContactInfo.pagomovil = bank + ' ' + phone + ' ' + ci;
          this.contacts.modal.show = true;
        }
      }
    },
    saveConfirm(){
      if(this.isDataComplete && this.contacts.modal.newContactInfo.name.length > 2){
        this.contacts.list.push({...this.contacts.modal.newContactInfo, id: this.contacts.list.length + 1});
        this.$q.localStorage.set('contacts', this.contacts.list);
      } else if(this.contacts.modal.newContactInfo.name.length <= 2){
        this.$q.notify({
          message: 'El nombre debe contener más de 2 letras',
          type: 'warning'
        });
      }
    },
    saveCancel(){
      this.contacts.modal.newContactInfo = {
        name: '',
        pagomovil: ''
      }

      this.contacts.modal.show = false;
    },
    formatedText(text){
      if(!text == '' && this.isSelectedBank){
        const phone = (text.match(this.regExp.phone) || ['TELF'])[0].trim();
        const ci = (text.match(this.regExp.ci) || ['C.I'])[0].trim().replace(/v/i, '');
        const bank = (text.match(this.regExp.bank) || ['BANCO'])[0].trim();
        const amount = (text.match(this.regExp.amount) || ['MONTO'])[0].trim().replace(/,00/i, '');

        let bankformato = this.bankDropdown.selected.format;

        bankformato = bankformato.replace('_CI', ci);
        bankformato = bankformato.replace('_MONTO', amount);
        bankformato = bankformato.replace('_BANKCODE', bank);
        bankformato = bankformato.replace('_TELF', phone);
        
        return bankformato;
      }
    },
  },
  computed:{
    isDataComplete(){
      // CI, PHONE, BANKCODE

      let isDataComplete =  this.regExp.phone.test(this.textarea) 
                            && this.regExp.ci.test(this.textarea)
                            && this.regExp.bank.test(this.textarea);


      if(isDataComplete && !this.isSelectedBank){
        this.$q.notify({
          message: 'Se detectaron los datos del pagomovil, ahora debes seleccionar un banco',
          type: 'info'
        });
      }

      return isDataComplete;
    },
    isSelectedBank(){
      return this.bankDropdown.selected.id == null? false:true;
    },
    isTextAreaEmpty(){
      return this.textarea == '';
    },
    isEmptyClipboard(){
      // DEV
      return false;
    }
  },
  created(){
    this.fasUniversity = fasUniversity;
    this.fasUserTag = fasUserTag;
    this.farHeart = farHeart;
    this.fasCopy = fasCopy;
    this.fasTimes = fasTimes;
    this.fasPaste = fasPaste;
    this.fasAddressCard = fasAddressCard
  },
  mounted(){
    const defaultBank = this.$q.localStorage.getItem('defaultBank');

    this.selectBank(defaultBank)

    const contactList = this.$q.localStorage.getItem('contactList');

    this.contacts.list = contactList || [];
  }
}
</script>

<style lang="scss">

  .selecter{
    @apply bg-primary-50 relative;

    &__container{
      @apply grid content-center grid-cols-12 border-t h-14 border-b border-shadows-100 text-primary-200;
    }

    &__name-selected{
      @apply text-2xl leading-10 block col-span-8 align-middle whitespace-nowrap overflow-ellipsis overflow-hidden;
    }

    &__bank-list{
      @apply absolute top-0 z-10 w-full;
    }

    &__icon{
      @apply text-4xl col-span-2 align-middle;

      &--bank{
        @apply ml-3;
      }

      &--userTag{
        @apply mr-3
      }
    }
  }

  .textArea{
    @apply bg-primary-50 relative pb-2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09);

    &__action{
      @apply text-primary-100 text-4xl;

      &--disable{
        @apply text-semitransparent text-4xl;
      }

      &--close{
        @apply absolute top-2 text-3xl right-6 text-semitransparent;  
      }

      &--bottomContainer{
        @apply grid grid-cols-12 bottom-2;
      }

      &--group{
        @apply col-start-10 col-end-12 col-span-4 grid grid-cols-2;
      }

      &--save{
        @apply mr-4 place-self-end;
      }
    }

    &__field{
      @apply w-full h-36 pr-14 pt-3 text-base text-left pl-4 bg-primary-50 resize-none text-primary-300;
    }

  }

  .footer{
    @apply absolute bottom-0 h-16 w-full bg-primary-50;

    &__text{
      &--container{
        @apply text-xl pl-3 absolute top-1/2 transform -translate-y-1/2;
      }
    }

    &__link{
      @apply text-primary-100;
    }
  }

  .modal{
    &__title{
      @apply mt-1 text-primary-100 align-middle;

      &--icon{
        @apply text-2xl align-middle;
      }
    }

    &__container{
      @apply text-center;
    }

    &__description{
      @apply text-primary-200
    }
    
    &__input{
      @apply border mt-2 rounded-lg border-primary-300 bg-primary-50 p-2 w-11/12;
    }
  }



</style>
