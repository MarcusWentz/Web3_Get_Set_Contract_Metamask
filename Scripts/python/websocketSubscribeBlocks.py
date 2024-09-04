# https://web3py.readthedocs.io/en/stable/providers.html#using-persistent-connection-providers

import asyncio
from web3 import AsyncWeb3
from web3.providers.persistent import (
    AsyncIPCProvider,
    WebSocketProvider,
)
import os

infura_base_sepolia_testnet_url_API = str(os.environ['baseSepoliaWSS']);

# LOG = True  # toggle debug logging
LOG = False  # toggle debug logging
if LOG:
    import logging
    # logger = logging.getLogger("web3.providers.AsyncIPCProvider")  # for the AsyncIPCProvider
    logger = logging.getLogger("web3.providers.WebSocketProvider")  # for the WebSocketProvider
    logger.setLevel(logging.DEBUG)
    logger.addHandler(logging.StreamHandler())

async def context_manager_subscription_example():
    #  async with AsyncWeb3(AsyncIPCProvider("./path/to.filename.ipc") as w3:  # for the AsyncIPCProvider
    async with AsyncWeb3(WebSocketProvider(infura_base_sepolia_testnet_url_API)) as w3:  # for the WebSocketProvider
        # subscribe to new block headers
        subscription_id = await w3.eth.subscribe("newHeads")
        async for response in w3.socket.process_subscriptions():
            # print(f"{response}\n")
            latest_block = await w3.eth.get_block("latest")
            # print(f"Latest block: {latest_block}")
            print(f"Latest block: {latest_block.number}")
            # handle responses here

            # if some_condition:
            #     # unsubscribe from new block headers and break out of
            #     # iterator
            #     await w3.eth.unsubscribe(subscription_id)
            #     break

        # still an open connection, make any other requests and get
        # # responses via send / receive
        # latest_block = await w3.eth.get_block("latest")
        # # print(f"Latest block: {latest_block}")
        # print(f"Latest block: {latest_block.number}")

        # the connection closes automatically when exiting the context
        # manager (the `async with` block)

asyncio.run(context_manager_subscription_example())