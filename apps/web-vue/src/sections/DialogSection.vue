<script setup lang="ts">
import { Button } from "@workspace/ui-vue/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui-vue/components/dialog"
import { Input } from "@workspace/ui-vue/components/input"
import { Label } from "@workspace/ui-vue/components/label"
</script>

<template>
  <section id="dialog" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Dialog</h2>
    <div class="flex flex-wrap items-center gap-3">
      <!-- Default: title, description, form, footer. -->
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" data-specimen="dialog-trigger-default">Edit report</Button>
        </DialogTrigger>
        <DialogContent data-specimen="dialog-default">
          <DialogHeader>
            <DialogTitle>Edit report</DialogTitle>
            <DialogDescription>
              Change the name and period. Figures update after you save.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-1.5">
            <Label for="dlg-name">Report name</Label>
            <Input id="dlg-name" default-value="Roadside reach Q1" />
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- No close button: footer carries the actions. -->
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" data-specimen="dialog-trigger-no-close">Without close button</Button>
        </DialogTrigger>
        <DialogContent :show-close-button="false" data-specimen="dialog-no-close">
          <DialogHeader>
            <DialogTitle>Share report</DialogTitle>
            <DialogDescription>Anyone with the link can view this report.</DialogDescription>
          </DialogHeader>
          <DialogFooter show-close-button>
            <Button>Copy link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </section>
</template>
