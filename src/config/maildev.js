<<<<<<< HEAD
if(process.env.NODE_ENV === 'development') {
  async function startMaildev () {
    const { default: Maildev } = await import('maildev')
    const maildev = new Maildev({
      basePathname: '/maildev'
    })
    maildev.listen((err, data) => {
      if(err) return console.log(`🚨 Failed to load maildev : ${e}`)
      return console.log('✅ Maildev server listening check your inbox at http://127.0.0.1:1080/maildev/')
    })
  }
  startMaildev()
}
=======
if(process.env.NODE_ENV=== 'development'){
  async function startMailDev (){
      const {default: Maildev} = await import('maildev')
      const maildev = new Maildev({
          basePathName: '/maildev'
      })
      maildev.listen((err, data)=> {
          if(err) return console.log(`🚨 Failed to load maildev : ${e}`)
          return console.log(`✅ Maildev server listening check your inbox at http://localhost:1080/#/`)
      })
  }
  startMailDev()
}
>>>>>>> d433e6392d5bf5300b08a2f0c6401ee8e970e886
