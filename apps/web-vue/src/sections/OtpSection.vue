<script setup lang="ts">
import { ref } from "vue"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@workspace/ui-vue/components/input-otp"
import { Label } from "@workspace/ui-vue/components/label"

const done = ref("")
</script>

<template>
  <section id="otp" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Input OTP</h2>

    <div class="flex flex-col gap-2">
      <Label for="otp-main">Verification code</Label>
      <InputOTP id="otp-main" :length="6" default-value="123" data-specimen="otp" @value-complete="done = $event">
        <InputOTPGroup data-specimen="otp-group">
          <InputOTPSlot data-specimen="otp-slot-filled" /><InputOTPSlot /><InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator data-specimen="otp-separator" />
        <InputOTPGroup>
          <InputOTPSlot data-specimen="otp-slot-empty" /><InputOTPSlot /><InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
      <p class="text-caption text-muted-foreground" data-specimen="otp-done">Complete: {{ done }}</p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="otp-invalid">Invalid</Label>
      <InputOTP id="otp-invalid" :length="4" invalid aria-describedby="otp-err" default-value="12" data-specimen="otp-invalid">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-invalid" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
      <p id="otp-err" class="text-caption text-danger-text">The code is not right.</p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="otp-disabled">Disabled</Label>
      <InputOTP id="otp-disabled" :length="4" disabled default-value="12" data-specimen="otp-disabled">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-disabled" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="otp-mask">Masked</Label>
      <InputOTP id="otp-mask" :length="4" mask default-value="42" data-specimen="otp-mask">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-mask" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
    </div>
  </section>
</template>
