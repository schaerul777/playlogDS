<script setup lang="ts">
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui-vue/components/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui-vue/components/progress"
import { Spinner } from "@workspace/ui-vue/components/spinner"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@workspace/ui-vue/components/table"

const sizes = ["sm", "default", "lg"] as const
const photo = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='%23004d9f'/></svg>"
</script>

<template>
  <section id="display2" class="flex flex-col gap-6">
    <h2 class="text-h2 text-ink-heading">Display: Table, Avatar, Progress, Spinner</h2>

    <div class="flex max-w-2xl flex-col gap-6">
      <Table data-specimen="table-default">
        <TableCaption data-specimen="table-caption">Reach by city, Q1 2025</TableCaption>
        <TableHeader data-specimen="table-header">
          <TableRow>
            <TableHead data-specimen="table-head">City</TableHead>
            <TableHead numeric data-specimen="table-head-numeric">Reach</TableHead>
            <TableHead numeric>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-specimen="table-body">
          <TableRow data-specimen="table-row">
            <TableCell data-specimen="table-cell">Jakarta</TableCell>
            <TableCell numeric data-specimen="table-cell-numeric">1,204,000</TableCell>
            <TableCell numeric>3,4</TableCell>
          </TableRow>
          <TableRow data-state="selected" data-specimen="table-row-selected">
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
            <TableCell numeric>2,9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Surabaya</TableCell>
            <TableCell numeric>588,120</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-specimen="table-footer">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell numeric>2,432,620</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table dense data-specimen="table-dense">
        <TableBody>
          <TableRow>
            <TableCell data-specimen="table-dense-cell">Jakarta</TableCell>
            <TableCell numeric>1,204,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <Avatar v-for="size in sizes" :key="size" :size="size" :data-specimen="`avatar-${size}`">
        <AvatarFallback :data-specimen="`avatar-fallback-${size}`">SC</AvatarFallback>
      </Avatar>
      <Avatar data-specimen="avatar-image">
        <AvatarImage :src="photo" alt="Sample" data-specimen="avatar-img" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar v-for="size in sizes" :key="`b-${size}`" :size="size" :data-specimen="`avatar-badge-${size}`">
        <AvatarFallback>AB</AvatarFallback>
        <AvatarBadge :data-specimen="`avatar-dot-${size}`"><span class="sr-only">Online</span></AvatarBadge>
      </Avatar>
      <AvatarGroup data-specimen="avatar-group">
        <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
        <AvatarGroupCount data-specimen="avatar-group-count">+3</AvatarGroupCount>
      </AvatarGroup>
    </div>

    <div class="flex max-w-md flex-col gap-4">
      <Progress :model-value="40" data-specimen="progress-40">
        <ProgressLabel data-specimen="progress-label">Reach</ProgressLabel>
        <ProgressValue data-specimen="progress-value" />
      </Progress>
      <Progress :model-value="0" data-specimen="progress-0">
        <ProgressLabel>Frequency</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress :model-value="100" data-specimen="progress-100" />
    </div>

    <div class="flex items-center gap-4">
      <Spinner data-specimen="spinner" />
      <Spinner class="size-6 text-muted-foreground" data-specimen="spinner-large" />
    </div>
  </section>
</template>
