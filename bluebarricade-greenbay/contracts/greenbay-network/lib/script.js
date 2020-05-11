/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.greenbay.depositMoneyFromExternal} tx The sample transaction instance.
 * @transaction
 */
async function depositMoneyFromExternal(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldBalance = tx.to_address.available_balance;

    // Update the asset with the new value.
    tx.to_address.available_balance = oldBalance + tx.deposit_amount;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.to_address);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.greenbay', 'depositEvent');
    event.to_address = tx.to_address;
    event.deposit_amount = tx.deposit_amount;
    emit(event);
}

/**
 * Sample transaction processor function.
 * @param {org.greenbay.withdrawMoneyToExternal} tx The sample transaction instance.
 * @transaction
 */

async function withdrawMoneyToExternal(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldBalance = tx.from_address.available_balance;
	if (oldBalance < tx.withdraw_amount){
      throw new Error('No Enough Balance!');
    }

    // Update the asset with the new value.
    tx.from_address.available_balance = oldBalance - tx.withdraw_amount;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.from_address);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.greenbay', 'withdrawEvent');
    event.from_address = tx.from_address;
    event.withdraw_amount = tx.withdraw_amount;
    emit(event);
}

/**
 * Sample transaction processor function.
 * @param {org.greenbay.transferMoney} tx The sample transaction instance.
 * @transaction
 */
async function transferMoney(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const send_available_amount = tx.from.available_balance;
	if (send_available_amount < tx.send_amount){
      throw new Error('No Enough Send Balance!');
    }

    const receive_available_amount = tx.to.available_balance;


    // Update the asset with the new value.
    tx.from.available_balance = send_available_amount - tx.send_amount;

    // Get the asset registry for the asset.
    const assetFromRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetFromRegistry.update(tx.from);

      // Update the asset with the new value.
    tx.to.available_balance = receive_available_amount + tx.receive_amount;

    // Get the asset registry for the asset.
    const assetToRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetToRegistry.update(tx.to);


    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.greenbay', 'transferMoneyEvent');
    event.from = tx.from;
    event.to = tx.to;
  	event.send_amount = tx.send_amount;
  	event.receive_amount = tx.receive_amount;
    emit(event);
}

/**
 * Sample transaction processor function.
 * @param {org.greenbay.lockBalance} tx The sample transaction instance.
 * @transaction
 */
async function lockBalance(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const availableBalance = tx.address.available_balance;
	if (availableBalance < tx.lock_amount){
      throw new Error('No Enough Lock Balance!');
    }

    // Update the asset with the new value.
    tx.address.available_balance = availableBalance - tx.lock_amount;
    tx.address.lock_balance = tx.address.lock_balance + tx.lock_amount;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.address);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.greenbay', 'lockBalanceEvent');
    event.address = tx.address;
    event.lock_amount = tx.lock_amount;
    emit(event);
}

/**
 * Sample transaction processor function.
 * @param {org.greenbay.unlockBalance} tx The sample transaction instance.
 * @transaction
 */
async function unlockBalance(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const lock_balance = tx.address.lock_balance;
	if (lock_balance < tx.unlock_amount){
		tx.unlock_amount = lock_balance;
    }

    // Update the asset with the new value.
    tx.address.available_balance = tx.address.available_balance + tx.unlock_amount;
    tx.address.lock_balance = tx.address.lock_balance - tx.unlock_amount;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.greenbay.Address');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.address);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.greenbay', 'unlockBalanceEvent');
    event.address = tx.address;
    event.unlock_amount = tx.unlock_amount;
    emit(event);
}
